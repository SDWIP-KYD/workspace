#!/usr/bin/env python3
"""
Medical Journal Visualizer - Image Generation Script
=====================================================

This script generates medical journal illustrations using MiniMax Image API.
You need a MiniMax API key to use this script.

Setup:
    pip install requests pillow

Usage:
    python medical_journal_visualizer.py --api-key "your-api-key" --prompt "your prompt" --output "output.png"

API Key:
    Get from https://platform.minimax.io/
    Or use environment variable MINIMAX_API_KEY
"""

import os
import sys
import json
import argparse
import time
import requests
from pathlib import Path
from typing import Optional, List, Dict, Any

# Try to import PIL for image handling
try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False


class MiniMaxImageGenerator:
    """Generate images using MiniMax Image API"""
    
    BASE_URL = "https://api.minimax.chat/v1"
    
    def __init__(self, api_key: str, group_id: Optional[str] = None):
        """
        Initialize the image generator.
        
        Args:
            api_key: Your MiniMax API key
            group_id: Optional group ID for organization
        """
        self.api_key = api_key
        self.group_id = group_id or os.environ.get("MINIMAX_GROUP_ID", "")
        
    def generate(
        self,
        prompt: str,
        output_path: str,
        model: str = "general",
        aspect_ratio: str = "16:9",
        timeout: int = 300
    ) -> Dict[str, Any]:
        """
        Generate an image from text prompt.
        
        Args:
            prompt: Text description of the image
            output_path: Where to save the generated image
            model: Model to use (default: general)
            aspect_ratio: Image aspect ratio (16:9, 1:1, etc.)
            timeout: Timeout in seconds
            
        Returns:
            Dict with success status and details
        """
        url = f"{self.BASE_URL}/image_generation"
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": model,
            "prompt": prompt,
            "aspect_ratio": aspect_ratio,
            "num_images": 1
        }
        
        if self.group_id:
            payload["group_id"] = self.group_id
            
        print(f"🎨 Generating image...")
        print(f"   Prompt: {prompt[:100]}...")
        print(f"   Aspect ratio: {aspect_ratio}")
        
        try:
            # Start generation
            response = requests.post(
                url,
                headers=headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code != 200:
                return {
                    "success": False,
                    "error": f"API error: {response.status_code} - {response.text}"
                }
            
            result = response.json()
            
            if "data" in result and len(result["data"]) > 0:
                task_id = result["data"][0].get("task_id")
                
                if not task_id:
                    # Direct generation (some models return immediately)
                    if "image_url" in result["data"][0]:
                        image_url = result["data"][0]["image_url"]
                        return self._download_and_save(image_url, output_path)
                
                # Wait for task completion
                print(f"   Task ID: {task_id}")
                return self._wait_for_task(task_id, headers, output_path, timeout)
            else:
                return {
                    "success": False,
                    "error": f"No image data in response: {result}"
                }
                
        except requests.exceptions.Timeout:
            return {"success": False, "error": "Request timeout"}
        except requests.exceptions.RequestException as e:
            return {"success": False, "error": f"Request failed: {str(e)}"}
        except Exception as e:
            return {"success": False, "error": f"Unexpected error: {str(e)}"}
    
    def _wait_for_task(
        self,
        task_id: str,
        headers: Dict,
        output_path: str,
        timeout: int
    ) -> Dict[str, Any]:
        """Poll for task completion"""
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            time.sleep(3)
            
            try:
                response = requests.get(
                    f"{self.BASE_URL}/image_generation/{task_id}",
                    headers=headers,
                    timeout=30
                )
                
                if response.status_code == 200:
                    result = response.json()
                    task_status = result.get("data", {}).get("task_status", "")
                    
                    print(f"   Status: {task_status}")
                    
                    if task_status == "COMPLETED":
                        image_url = result["data"].get("image_url")
                        if image_url:
                            return self._download_and_save(image_url, output_path)
                        return {"success": False, "error": "No image URL in completed task"}
                        
                    elif task_status == "FAILED":
                        return {"success": False, "error": "Image generation failed"}
                        
                elif response.status_code != 200:
                    print(f"   Status check error: {response.status_code}")
                    
            except Exception as e:
                print(f"   Status check error: {e}")
                continue
                
        return {"success": False, "error": f"Timeout after {timeout}s"}
    
    def _download_and_save(self, url: str, output_path: str) -> Dict[str, Any]:
        """Download image from URL and save to file"""
        try:
            response = requests.get(url, timeout=60)
            response.raise_for_status()
            
            # Ensure output directory exists
            Path(output_path).parent.mkdir(parents=True, exist_ok=True)
            
            with open(output_path, "wb") as f:
                f.write(response.content)
                
            print(f"✅ Image saved to: {output_path}")
            
            # Get file size
            size = os.path.getsize(output_path)
            print(f"   File size: {size / 1024:.1f} KB")
            
            return {
                "success": True,
                "output_path": output_path,
                "file_size": size
            }
            
        except Exception as e:
            return {"success": False, "error": f"Download failed: {str(e)}"}


def generate_medical_frame(
    api_key: str,
    frame_number: int,
    topic: str,
    data: str,
    mechanism: str,
    color_palette: str,
    output_path: str
) -> Dict[str, Any]:
    """
    Generate a single medical journal frame.
    
    Args:
        api_key: MiniMax API key
        frame_number: Frame number (1, 2, etc.)
        topic: Main topic/title
        data: Specific data to visualize
        mechanism: Detailed explanation
        color_palette: Color specifications
        output_path: Output file path
        
    Returns:
        Generation result dict
    """
    
    prompt = f"""Medical {topic} infographic. 
Display: {data}
{mechanism}
Minimalist flat vector style. 
Color palette: {color_palette} Medical White #F8FAFC background. 
Sans-serif typography, NO FOOTER."""
    
    generator = MiniMaxImageGenerator(api_key)
    
    return generator.generate(
        prompt=prompt,
        output_path=output_path,
        aspect_ratio="16:9"
    )


def create_slideshow_html(
    image_paths: List[str],
    output_path: str,
    title: str = "Medical Journal Visualization"
) -> None:
    """
    Create an HTML slideshow from generated images.
    
    Args:
        image_paths: List of image file paths
        output_path: Output HTML file path
        title: Presentation title
    """
    
    slides_html = ""
    for i, img_path in enumerate(image_paths):
        img_name = Path(img_path).name
        active = "active" if i == 0 else ""
        slides_html += f"""
        <div class="slide {active}">
            <div class="slide-content">
                <img src="{img_name}" alt="Slide {i+1}">
            </div>
        </div>"""
    
    dots_html = ""
    for i in range(len(image_paths)):
        active = "active" if i == 0 else ""
        dots_html += f'<div class="dot {active}" onclick="goToSlide({i})"></div>'
    
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <style>
        :root {{
            --primary: #2563EB;
            --slate: #1E293B;
            --gray: #64748B;
            --white: #F8FAFC;
        }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: 'Inter', sans-serif; background: var(--white); overflow: hidden; }}
        
        .slideshow {{ position: relative; width: 100vw; height: 100vh; }}
        
        .slide {{
            position: absolute; top: 0; left: 0;
            width: 100%; height: 100%;
            opacity: 0; transform: translateX(100%);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex; align-items: center; justify-content: center; padding: 40px;
        }}
        .slide.active {{ opacity: 1; transform: translateX(0); }}
        .slide.prev {{ transform: translateX(-100%); }}
        
        .slide img {{ max-width: 100%; max-height: 85vh; object-fit: contain; border-radius: 16px; box-shadow: 0 25px 80px rgba(0,0,0,0.15); }}
        
        .nav-controls {{ position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%); display: flex; gap: 16px; z-index: 100; background: white; padding: 16px 32px; border-radius: 50px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }}
        .nav-btn {{ width: 50px; height: 50px; border: none; border-radius: 50%; background: var(--primary); color: white; cursor: pointer; font-size: 20px; transition: all 0.3s; }}
        .nav-btn:hover {{ transform: scale(1.1); }}
        
        .progress-dots {{ display: flex; gap: 10px; align-items: center; }}
        .dot {{ width: 12px; height: 12px; border-radius: 50%; background: var(--gray); transition: all 0.3s; cursor: pointer; }}
        .dot.active {{ background: var(--primary); transform: scale(1.3); }}
        
        .slide-counter {{ position: fixed; top: 30px; right: 40px; font-size: 18px; font-weight: 600; background: white; padding: 12px 24px; border-radius: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }}
        .slide-counter span {{ color: var(--primary); }}
    </style>
</head>
<body>
    <div class="slide-counter"><span id="current">1</span> / <span id="total">{len(image_paths)}</span></div>
    <div class="slideshow">{slides_html}</div>
    <div class="nav-controls">
        <button class="nav-btn" onclick="changeSlide(-1)">←</button>
        <div class="progress-dots">{dots_html}</div>
        <button class="nav-btn" onclick="changeSlide(1)">→</button>
    </div>
    <script>
        let current = 0;
        const slides = document.querySelectorAll('.slide');
        const total = slides.length;
        
        function update() {{
            slides.forEach((s, i) => {{
                s.classList.remove('active', 'prev');
                if (i === current) s.classList.add('active');
                else if (i < current) s.classList.add('prev');
            }});
            document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
            document.getElementById('current').textContent = current + 1;
        }}
        
        function changeSlide(d) {{
            current = Math.max(0, Math.min(total - 1, current + d));
            update();
        }}
        
        function goToSlide(i) {{ current = i; update(); }}
        
        document.addEventListener('keydown', e => {{
            if (e.key === 'ArrowLeft') changeSlide(-1);
            if (e.key === 'ArrowRight') changeSlide(1);
        }});
    </script>
</body>
</html>"""
    
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w") as f:
        f.write(html)
    
    print(f"✅ HTML slideshow created: {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Medical Journal Visualizer - Image Generation")
    parser.add_argument("--api-key", "-k", help="MiniMax API key (or set MINIMAX_API_KEY env)")
    parser.add_argument("--prompt", "-p", help="Image generation prompt")
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument("--frame", "-f", type=int, help="Frame number for title")
    parser.add_argument("--topic", "-t", help="Topic/title for the frame")
    parser.add_argument("--data", "-d", help="Data to visualize")
    parser.add_argument("--mechanism", "-m", help="Mechanism/explanation")
    parser.add_argument("--colors", "-c", help="Color palette specification")
    parser.add_argument("--html", help="Create HTML slideshow from existing images")
    parser.add_argument("--title", default="Medical Journal", help="Presentation title")
    
    args = parser.parse_args()
    
    # Check for API key
    api_key = args.api_key or os.environ.get("MINIMAX_API_KEY")
    
    if not api_key:
        print("❌ Error: API key required!")
        print("   Set MINIMAX_API_KEY environment variable or use --api-key")
        print("\n📖 Get API key from: https://platform.minimax.io/")
        sys.exit(1)
    
    # If HTML generation from existing images
    if args.html:
        images = sorted(Path(args.html).glob("*.png"))
        create_slideshow_html([str(p) for p in images], args.html.replace(".png", "") + ".html", args.title)
        return
    
    # Generate single image
    if not args.prompt:
        # Build prompt from components
        if not all([args.topic, args.data, args.mechanism, args.colors]):
            print("❌ Error: Either --prompt or all of --topic, --data, --mechanism, --colors required")
            sys.exit(1)
        
        args.prompt = f"""Medical {args.topic} infographic. 
Display: {args.data}
{args.mechanism}
Minimalist flat vector style. 
Color palette: {args.colors} Medical White #F8FAFC background. 
Sans-serif typography, NO FOOTER."""
    
    if not args.output:
        args.output = f"frame_{args.frame or 1}.png"
    
    generator = MiniMaxImageGenerator(api_key)
    result = generator.generate(
        prompt=args.prompt,
        output_path=args.output
    )
    
    if result["success"]:
        print(f"\n🎉 Success! Image saved to: {result['output_path']}")
    else:
        print(f"\n❌ Failed: {result.get('error', 'Unknown error')}")
        sys.exit(1)


if __name__ == "__main__":
    main()

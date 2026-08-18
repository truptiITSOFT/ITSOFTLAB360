import cv2
import subprocess
from rembg import remove
import numpy as np

input_path = r"c:\Users\Administrator\OneDrive\Desktop\ITSoftlab360\frontend\public\videos\franchise-hero.mp4"
output_path = r"c:\Users\Administrator\OneDrive\Desktop\ITSoftlab360\frontend\public\videos\franchise-hero-transparent.webm"
ffmpeg_path = r"c:\Users\Administrator\OneDrive\Desktop\ITSoftlab360\frontend\ffmpeg-bin\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe"

cap = cv2.VideoCapture(input_path)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS)
frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

# We can scale down to speed up processing and save file size
# Let's scale to height 600px
scale = 600.0 / height
out_w = int(width * scale)
# Ensure width is even for ffmpeg
if out_w % 2 != 0:
    out_w += 1
out_h = 600

command = [
    ffmpeg_path,
    '-y',
    '-f', 'rawvideo',
    '-vcodec', 'rawvideo',
    '-s', f'{out_w}x{out_h}',
    '-pix_fmt', 'rgba',
    '-r', str(fps),
    '-i', '-',
    '-c:v', 'libvpx-vp9',
    '-pix_fmt', 'yuva420p',
    '-b:v', '1.5M',
    '-auto-alt-ref', '0',
    output_path
]

process = subprocess.Popen(command, stdin=subprocess.PIPE)

print(f"Processing {frames} frames...")
count = 0
while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Scale down
    frame = cv2.resize(frame, (out_w, out_h))
    
    # convert BGR to RGB
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    # remove background (returns RGBA)
    result = remove(rgb)
    
    # Write to ffmpeg pipe
    process.stdin.write(result.tobytes())
    
    count += 1
    if count % 20 == 0:
        print(f"Processed {count}/{frames}")

process.stdin.close()
process.wait()
cap.release()
print("Video processing complete!")

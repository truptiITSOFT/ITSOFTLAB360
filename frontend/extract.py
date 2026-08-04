import cv2
import os

video_path = r"C:\Users\Administrator\OneDrive\Videos\Screen Recordings\Screen Recording 2026-08-04 101830.mp4"
output_dir = r"c:\Users\Administrator\OneDrive\Desktop\ITSoftlab360\frontend\public\features"
os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
fps = cap.get(cv2.CAP_PROP_FPS)

# The video seems to scroll through the features. We'll sample 20 frames spaced evenly.
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
step = max(1, total_frames // 20)

count = 0
for i in range(0, total_frames, step):
    cap.set(cv2.CAP_PROP_POS_FRAMES, i)
    ret, frame = cap.read()
    if not ret:
        break
    
    # Let's save the raw frames so we can look at them or the user can use them directly
    # We will just save 1 frame for now to find where the images are.
    cv2.imwrite(os.path.join(output_dir, f"frame_{count}.jpg"), frame)
    count += 1
    
cap.release()
print(f"Extracted {count} frames")

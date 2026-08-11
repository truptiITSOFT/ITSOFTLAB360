import os
import re

def scale_px(match):
    val = float(match.group(1))
    if val <= 1.0:
        return match.group(0) # Keep 1px or less as is
    scaled = round(val * 0.8, 1)
    if scaled.is_integer():
        scaled = int(scaled)
    return f"{scaled}px"

def process_directory(directory):
    files_modified = 0
    total_files = 0
    
    for root, _, files in os.walk(directory):
        for file in files:
            if not file.endswith(('.tsx', '.ts', '.jsx', '.js', '.css')):
                continue
                
            filepath = os.path.join(root, file)
            total_files += 1
            
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
            except Exception as e:
                print(f"Error reading {filepath}: {e}")
                continue
            
            # Match any number followed by 'px' that is not preceded by a digit or dot
            new_content = re.sub(r'(?<![\d.])(\d+(?:\.\d+)?)px\b', scale_px, content)
            
            if new_content != content:
                try:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    files_modified += 1
                    print(f"Modified: {filepath}")
                except Exception as e:
                    print(f"Error writing {filepath}: {e}")
                    
    print(f"\nDone. Modified {files_modified} out of {total_files} processed files.")

if __name__ == '__main__':
    src_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'src')
    process_directory(src_dir)

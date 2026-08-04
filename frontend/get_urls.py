import urllib.request, re
try:
    html = urllib.request.urlopen('https://techclouderp.com/').read().decode('utf-8', errors='ignore')
    imgs = re.findall(r'src=[\"\']([^\"\']+)[\"\']', html)
    for img in imgs:
        if '.png' in img or '.jpg' in img:
            print(img)
except Exception as e:
    print(e)

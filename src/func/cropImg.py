from PIL import Image
import os

Image.MAX_IMAGE_PIXELS = None

# Встановіть директорію, де знаходяться ваші зображення
input_folder = r'C:\Users\Admin\OneDrive\Desktop\аптека 911\Малюнки дітей\src\img'
output_folder = r'C:\Users\Admin\OneDrive\Desktop\аптека 911\Малюнки дітей\src\img_cropped'

# Якщо папка виводу не існує, створіть її
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Пройдіться по всіх файлах у вказаній папці
for file_name in os.listdir(input_folder):
    if file_name.endswith('.jpg'):
        # Відкриття зображення
        with Image.open(os.path.join(input_folder, file_name)) as img:
            # Встановіть якість зображення
            # Значення 'quality' може бути від 1 (найгірша якість, найбільше зжаття)
            # до 95 (найкраща якість, найменше зжаття)
            img.save(os.path.join(output_folder, file_name), 'JPEG', quality=85)

print('Зображення було зжато!')

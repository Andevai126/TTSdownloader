import os
from pydub import AudioSegment 

names = os.listdir("./sounds")
# print("Names:", names)

for name in names:
    audio = AudioSegment.from_file("./sounds/" + name, format="mp3")
    middleBit = audio[150:-200]
    middleBit.export("./cuts/" + name, format="mp3")
    print("Saved: ", name)

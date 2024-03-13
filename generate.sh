#!/bin/bash

# radioburzy
python3 ./gallery_generator.py config/radioburza/leden_2024.ini
python3 ./gallery_generator.py config/radioburza/brezen_2024.ini

# laboratoř EE
python3 ./gallery_generator.py config/lab/storage_2024_03_07.ini

# elektronky
python3 ./gallery_generator.py config/tubes/gu81m.ini
python3 ./gallery_generator.py config/tubes/general.ini
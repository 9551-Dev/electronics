#!/bin/bash

# radioburzy
python3 ./gallery_generator.py ./assets/common_config.ini config/events/radioburza/leden_2024.ini
python3 ./gallery_generator.py ./assets/common_config.ini config/events/radioburza/brezen_2024.ini
python3 ./gallery_generator.py ./assets/common_config.ini config/events/radioburza/kveten_2024.ini

# laboratoř EE
python3 ./gallery_generator.py ./assets/common_config.ini config/lab/storage_2024_03_07.ini

# elektronky
python3 ./gallery_generator.py ./assets/common_config.ini config/tubes/gu81m.ini
python3 ./gallery_generator.py ./assets/common_config.ini config/tubes/general.ini

# projects
python3 ./gallery_generator.py ./assets/common_config.ini config/projects/sstc_v1.ini
python3 ./gallery_generator.py ./assets/common_config.ini config/projects/hfvttc_v1.ini

# misc
python3 ./gallery_generator.py ./assets/common_config.ini config/misc/pat_a_mat.ini
#!/bin/bash

COMMON_CONFIG="./assets/common_config.ini"

declare -a GALLERY_CONFIGS=(
    "config/events/radioburza/leden_2024.ini"
    "config/events/radioburza/brezen_2024.ini"
    "config/events/radioburza/kveten_2024.ini"

    "config/lab/storage_2024_03_07.ini"

    "config/tubes/gu81m.ini"
    "config/tubes/general.ini"

    "config/projects/sstc_v1.ini"
    "config/projects/hfvttc_v1.ini"

    "config/misc/pat_a_mat.ini"
)

for config in "${GALLERY_CONFIGS[@]}"; do
    python3 ./gallery_generator.py $COMMON_CONFIG $config
done
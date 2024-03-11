import os
import sys
import configparser
import shutil

def check_file_exists(file_path):
    if not os.path.exists(file_path):
        print(f"Error: File not found: {file_path}")
        return False
    return True

def check_folder_exists(folder_path):
    if not os.path.exists(folder_path):
        print(f"Error: Folder not found: {folder_path}")
        return False
    return True

def remove_base_dir(index,path):
    if path.split(os.sep)[0] == index["base_directory"]:
        return os.path.dirname(os.sep.join(path.split(os.sep)[1:]))
    else:
        return path

def read_config(config_path):
    print("Reading configuration...")
    config = configparser.ConfigParser()
    config.read(config_path)

    settings = {
        "title":        config.get("Settings","title"),
        "image_folder": config.get("Settings","image_folder"),
    }

    index = {
        "index_style":     config.get("Index","page")               if "Index" in config else None,
        "enabled":         config.get("Index","enabled") == "true"  if "Index" in config else None,
        "base_directory":  config.get("Index","base_directory")     if "Index" in config else None,
        "base_index_name": config.get("Index","base_index_name")    if "Index" in config else None,

        "generate_project_index":      config.get("Index.special_rules","generate_project_index")      == "true" if "Index.special_rules" in config else None,
        "generate_project_root_index": config.get("Index.special_rules","generate_project_root_index") == "true" if "Index.special_rules" in config else None,
        "project_index_name":          config.get("Index.special_rules","project_index_name")          if "Index.special_rules" in config else None,
        "project_root_index_name":     config.get("Index.special_rules","project_root_index_name")     if "Index.special_rules" in config else None,

        "root_index_name":  config.get("Index.special_rules","root_index_name")  if "Index.special_rules" in config else None,
        "root_index_super": config.get("Index.special_rules","root_index_super") if "Index.special_rules" in config else None,
    }

    core = {
        "template_path": config.get("Core","template_path"),
        "css_path":      config.get("Core","css_path"),
        "js_path":       config.get("Core","js_path")
    }

    output = {
        "output_folder":         config.get("Output", "output_folder"),
        "images_directory_name": config.get("Output", "images_directory_name"),
        "core_directory_name":   config.get("Output", "core_directory_name"),
        "output_file_name":      config.get("Output", "output_file_name")
    }

    required_files = [settings['image_folder'], core['template_path'], core['css_path'], core['js_path']]
    for file_path in required_files:
        if not check_file_exists(file_path):
            print("Exiting: One or more required files not found.")
            exit(1)

    print("Configuration read successfully.")
    return settings, core, output, index

def get_image_filenames(image_folder):
    print(f"Scanning image folder: {image_folder}")
    image_files = [f for f in os.listdir(image_folder) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]
    print(f"Found {len(image_files)} image(s):")
    for image_file in image_files:
        print(f" - {image_file}")
    return sorted(image_files)

def generate_html(settings, core, output):
    print("\nGenerating HTML...")
    with open(core['template_path'], 'r') as template_file:
        template_content = template_file.read()
    with open(core['js_path'], 'r') as js_file:
        js_content = js_file.read()
    with open(core['css_path'], 'r') as css_file:
        css_content = css_file.read()

    image_files = get_image_filenames(settings['image_folder'])
    image_paths = [os.path.join(output['images_directory_name'], "GAL_" + os.path.basename(image_file)) for image_file in image_files]

    output_images_folder = os.path.join(output['output_folder'], output['images_directory_name'])
    os.makedirs(output_images_folder, exist_ok=True)

    for image_file, image_path in zip(image_files, image_paths):
        print(f"Copying image: {image_file} to {output_images_folder}")
        shutil.copy(os.path.join(settings['image_folder'], image_file), os.path.join(output_images_folder, "GAL_" + image_file))

    copied_image_paths = [f'"{path}"' for path in image_paths]
    image_tags         = '\n'.join([f'            <img src={path} alt=\"{os.path.basename(path)} onclick=\'open_image_viewer({path})\'>'
                                    for path in copied_image_paths])

    template_content = template_content.replace('{{title}}', settings['title'])
    template_content = template_content.replace('{{css_path}}', os.path.join(output['core_directory_name'], os.path.basename(core['css_path'])))
    template_content = template_content.replace('{{js_path}}',  os.path.join(output['core_directory_name'], os.path.basename(core['js_path'])))
    template_content = template_content.replace('{{image_tags}}', image_tags)

    image_paths_js = ",\n    ".join(copied_image_paths)
    js_content     = js_content.replace('{{image_paths}}', image_paths_js)

    output_core_folder = os.path.join(output['output_folder'], output['core_directory_name'])
    os.makedirs(output_core_folder, exist_ok=True)

    output_js_path = os.path.join(output_core_folder, os.path.basename(core['js_path']))
    with open(output_js_path, 'w') as output_js_file:
        output_js_file.write(js_content)

    output_css_path = os.path.join(output_core_folder, os.path.basename(core['css_path']))
    with open(output_css_path, 'w') as output_css_file:
        output_css_file.write(css_content)

    output_file_path = os.path.join(output['output_folder'], output['output_file_name'])
    with open(output_file_path, 'w') as output_file:
        output_file.write(template_content)

    print(f'\nGenerated {output_file_path} successfully.')

def get_index_content(index):
    if index['index_style']:
        if os.path.exists(index['index_style']):
            with open(index['index_style'], 'r') as index_file:
                return index_file.read()
        else:
            print(f"Error: Index HTML file not found at {index['index_style']}.")
    return None

def remove_comment(index_content):
    index_content = index_content.replace("{{comment_start}}","")
    index_content = index_content.replace("{{comment_end}}",  "")

    return index_content

def generate_directory_index(directory_path, index, index_name):
    print(f"Generating index for directory: {directory_path}")

    index_content = get_index_content(index)
    if index_content:
        index_content = index_content.replace('{{title}}',f"Index of {directory_path}")

        directory_list_content = ""
        file_list_content = ""

        directory_items = []
        file_items = []

        for item in os.listdir(directory_path):
            item_path = os.path.join(directory_path, item)
            if os.path.isdir(item_path):
                directory_items.append(item)
            else:
                if item != index_name:
                    file_items.append(item)

        directory_items.sort()
        file_items.sort()

        for item in directory_items:
            directory_list_content += f"<li><a href=\"{item}/\">{item}/ <sub>[DIR]</sub></a></li>\n"
        for item in file_items:
            file_list_content += f"<li><a href=\"{item}\">{item} <sub>[FILE]</sub></a></li>\n"

        directory_list_content += f"<li><a href=\"{index_name}\">{index_name} <sub>[THIS]</sub></a></li>\n"

        index_content = index_content.replace('{{directory_list}}',directory_list_content+file_list_content)

        if os.path.normpath(directory_path) == os.path.normpath(index["base_directory"]):
            index_content = index_content.replace("{{comment_start}}","<!--")
            index_content = index_content.replace("{{comment_end}}",  "-->")
        elif remove_base_dir(index,directory_path) == "":
            index_content = index_content.replace('{{parent}}',"")
            index_content = remove_comment(index_content)
        elif (directory_path.split(os.sep)[0] == index["base_directory"]) and (os.path.normpath(directory_path) != os.path.normpath(index["base_directory"])):
            index_content = index_content.replace('{{parent}}',f"/{remove_base_dir(index,directory_path)}/")
            index_content = remove_comment(index_content)
        else:
            index_content = index_content.replace('{{parent}}',f"{os.path.dirname(directory_path)}")
            index_content = remove_comment(index_content)

        with open(os.path.join(directory_path,index_name), 'w') as index_file:
            index_file.write(index_content)
    else:
        print("Error: Index content not found.")

def generate_directory_indexes(output_folder,output,index):
    print(f"\nGenerating directory indexes for: {output_folder}")

    output_dirs = output_folder.split(os.path.sep)

    for i in range(len(output_dirs)):
        directory_path = os.path.join(*output_dirs[:i+1])
        if directory_path != output_folder and os.path.normpath(directory_path) != os.path.normpath(index["base_directory"]):
            generate_directory_index(directory_path,index,index["base_index_name"])

    if index["generate_project_index"]:
        print(f"\nGenerating project directory indexes for: {directory_path}")

        if index["generate_project_root_index"]:
            generate_directory_index(directory_path,index,index["project_root_index_name"])

        for root,dirs,files in os.walk(directory_path):
            for dir_name in dirs:
                current_dir = os.path.join(root, dir_name)
                generate_directory_index(current_dir,index,index["project_index_name"])

    generate_directory_index(index["base_directory"] or output["output_folder"].split(os.sep)[0],index,index["root_index_name"] or "index.html")


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python script.py [config_path]")
        exit(1)

    config_path = sys.argv[1]
    settings, core, output, index = read_config(config_path)

    print(f'\nTitle: {settings["title"]}')
    print(f'Index files: {index["enabled"] and "enabled" or "disabled"} ({index["enabled"]})')

    generate_html(settings, core, output)

    if index["enabled"]:
        generate_directory_indexes(output['output_folder'], output, index)

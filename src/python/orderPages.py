#!/usr/bin/python3
import json
read_file =  open("../gems/gemdatPages.json", "r")
u_dict = json.loads(read_file.read())
write_file = open("../gems/gemdatPages.json", "w")
sorted_dict = sorted(u_dict, key=lambda d: d["name"]) 
[print(sorted_dict[i]["name"]) for i in range(0, len(sorted_dict))]
write_file.write(json.dumps(sorted_dict, indent=4))
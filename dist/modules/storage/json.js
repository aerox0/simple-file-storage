"use strict";Object.defineProperty(exports,"__esModule",{value:true});Object.defineProperty(exports,"SimpleFileStorageJson",{enumerable:true,get:()=>SimpleFileStorageJson});const _types=require("./types");class SimpleFileStorageJson extends _types.SimpleFileStorage{async load(){this.data=JSON.parse(await this.readStorageFile());return}async save(){this.createStorageFile(JSON.stringify(this.data));return}constructor(file_path,data={}){super(file_path);this.data=data}}
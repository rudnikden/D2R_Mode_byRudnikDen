const fs=require('fs');
exports.read=(f)=>{const t=fs.readFileSync(f,'utf8').replace(/^﻿/,'').split(/\r?\n/).filter(l=>l.length);const h=t[0].split('\t');return t.slice(1).map(l=>{const c=l.split('\t');const o={};h.forEach((k,i)=>o[k]=c[i]??'');return o;});};

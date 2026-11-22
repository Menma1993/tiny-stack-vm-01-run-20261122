import{readFileSync,readdirSync,mkdirSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output',T='01146abf0000000099999995999599909990000000000000044000000000000058000000000000004414',E=new TextEncoder;
function run(P,N){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536),B=()=>o.subarray(0,ol);
let s=0,q=0,p=0,n=0,j=0,ol=0;
for(;;){
if(n==1e6||p<0||p>=P.length)return[n==1e6?10:9,B()];
const b=P[p];
if(!(b<8||(b>15&&b<35&&b!=31)||(b>47&&b<53)||b==64||b==65||(b>79&&b<84)))return[5,B()];
const m=b==1?1:b==2?4:b>47&&b<52?2:0;
if(p+m>=P.length)return[9,B()];
n++;
const x=p+1+m,k=parseInt(T[b],16),u=k>>2,v=k&3;
if(s<u)return[2,B()];
if(s-u+v>256)return[3,B()];
p=x;
switch(b){
case 0:return[0,B()];
case 1:D[s++]=(P[x-1]<<24)>>24;break;
case 2:D[s++]=P[x-4]|P[x-3]<<8|P[x-2]<<16|P[x-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const t=D[s-1];D[s-1]=D[s-2];D[s-2]=t;break}
case 6:D[s]=D[s-2];s++;break;
case 7:{const t=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=t;break}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:p=x+(((P[x-2]|P[x-1]<<8)<<16)>>16);break;
case 49:{const g=D[--s];if(!g)p=x+(((P[x-2]|P[x-1]<<8)<<16)>>16);break}
case 50:{const g=D[--s];if(g)p=x+(((P[x-2]|P[x-1]<<8)<<16)>>16);break}
case 51:if(q==64)return[7,B()];C[q++]=x;p=P[x-2]|P[x-1]<<8;break;
case 52:if(!q)return[8,B()];p=C[--q];break;
case 64:{const a=D[s-1];if(a<0||a>255)return[6,B()];D[s-1]=M[a];break}
case 65:{const a=D[s-1];if(a<0||a>255)return[6,B()];s-=2;M[a]=D[s];break}
case 80:{const g=E.encode(String(D[s-1]));if(ol+g.length>65536)return[11,B()];s--;o.set(g,ol);ol+=g.length;break}
case 81:if(ol+1>65536)return[11,B()];o[ol++]=D[--s]&255;break;
case 82:D[s++]=j<N.length?N[j++]:-1;break;
case 83:return[D[--s]&255,B()];
default:{const y=D[s-1],a=D[s-2];let r;
if(b<19)r=b<17?(a+y)|0:b==17?(a-y)|0:Math.imul(a,y);
else if(b<23){if(!y)return[4,B()];r=b==19?a==-2147483648&&y==-1?a:(a/y)|0:b==20?y==-1?0:a%y|0:b==21?Math.floor((a>>>0)/(y>>>0))|0:(a>>>0)%(y>>>0)|0}
else if(b<27)r=b==24?a&y:b==25?a|y:a^y;
else if(b<31)r=b==28?a<<(y&31):b==29?a>>(y&31):(a>>>(y&31))|0;
else r=b==32?a==y?1:0:b==33?a<y?1:0:(a>>>0)<(y>>>0)?1:0;
s-=2;D[s++]=r;break}
}
}
}
for(const d of readdirSync(I).sort()){
const P=readFileSync(join(I,d,'program.bin')),N=readFileSync(join(I,d,'input.bin')),[e,o]=run(P,N);
mkdirSync(join(O,d),{recursive:true});
writeFileSync(join(O,d,'stdout.bin'),o);
writeFileSync(join(O,d,'exit.txt'),e+'\n');
}

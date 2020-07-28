export default (content,putInto, empty=false)=>{
    if(empty) putInto.innerHTML = "";
    putInto.append(content);
    return putInto;
}

// 深拷贝
export function deepCopy(obj:any){//导出深拷贝函数
    //判断是否为基本类型或null
    if(obj === null || typeof obj !== 'object'){//递归出口
        return obj
    }
    //创建拷贝后的对象
    const newObj:any = Array.isArray(obj) ? [] : {}
    //遍历对象的属性
    for (const key in obj){
        if(Object.prototype.hasOwnProperty.call(obj, key)){
          //递归拷贝属性值
          newObj[key] = deepCopy(obj[key])
        }
    }
    return newObj
}

function addEvent(obj,ev,fn,bubble)    //obj为要绑定事件的元素，ev为要绑定的事件，fn为绑定事件的函数
{
    if(obj.attachEvent)
    {
        obj.attachEvent("on" + ev,fn);
    }
    else
    {
        obj.addEventListener(ev,fn,bubble);
    }
}

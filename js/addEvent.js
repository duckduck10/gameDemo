function addEvent(obj,ev,fn,bubble)    //objΪҪ���¼���Ԫ�أ�evΪҪ�󶨵��¼���fnΪ���¼��ĺ���
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

(function (window, undefined) {
    var dom = {
        //���¼�
        on: function (node, eventName, handler) {
            if (node.addEventListener) {
                node.addEventListener(eventName, handler);
            }
            else {
                node.attachEvent("on" + eventName, handler);
            }
        },
        //��ȡԪ�ص���ʽ
        getStyle: function (node, styleName) {
            var realStyle = null;
            if (window.getComputedStyle) {
                realStyle = window.getComputedStyle(node, null)[styleName];
            }
            else if (node.currentStyle) {
                realStyle = node.currentStyle[styleName];
            }
            return realStyle;
        },
        //��ȡ����Ԫ�ص���ʽ
        setCss: function (node, css) {
            for (var key in css) {
                node.style[key] = css[key];
            }
        }
    };

    //#region ��קԪ����
    function DragElement(node) {
        this.node = node;
        this.x = 0;
        this.y = 0;
    }
    DragElement.prototype = {
        constructor: DragElement,
        init: function () {
            this.setEleCss({
                "left": dom.getStyle(this.node, "left"),
                "top": dom.getStyle(this.node, "top")
            })
                .setXY(node.style.left, node.style.top);
        },
        setXY: function (x, y) {
            this.x = parseInt(x) || 0;
            this.y = parseInt(y) || 0;
            return this;
        },
        setEleCss: function (css) {
            dom.setCss(this.node, css);
            return this;
        }
    }
    //#endregion

    //#region ���Ԫ��
    function Mouse() {
        this.x = 0;
        this.y = 0;
    }
    Mouse.prototype.setXY = function (x, y) {
        this.x = parseInt(x);
        this.y = parseInt(y);
    }
    //#endregion

    //��ק����
    var draggableConfig = {
        zIndex: 1,
        draggingObj: null,
        mouse: new Mouse()
    };

    function Drag(ele) {
        this.ele = ele;

        function mouseDown(event) {
            var ele = event.target || event.srcElement;

            draggableConfig.mouse.setXY(event.clientX, event.clientY);

            draggableConfig.draggingObj = new DragElement(ele);
            draggableConfig.draggingObj
                .setXY(ele.style.left, ele.style.top)
                .setEleCss({
                    "zIndex": draggableConfig.zIndex++
                });
                if(dom.getStyle(ele,"position")!='relative'&&dom.getStyle(ele,"position")!='absolute')
                    draggableConfig.draggingObj.setEleCss({
                    "position": "relative"
                });
            var x=dom.getStyle(ele,"position");
            console.log(x);
        }

        ele.onselectstart = function () {
            //��ֹ��ק�����ڵ����ֱ�ѡ��
            return false;
        }
        dom.on(ele, "mousedown", mouseDown);
    }

    dom.on(document, "mousemove", function (event) {
        if (draggableConfig.draggingObj) {
            var mouse = draggableConfig.mouse,
                draggingObj = draggableConfig.draggingObj;
            draggingObj.setEleCss({
                "left": parseInt(event.clientX - mouse.x + draggingObj.x) + "px",
                "top": parseInt(event.clientY - mouse.y + draggingObj.y) + "px"
            });
        }
    })

    dom.on(document, "mouseup", function (event) {
        draggableConfig.draggingObj = null;
    })


    window.Drag = Drag;
})(window, undefined);
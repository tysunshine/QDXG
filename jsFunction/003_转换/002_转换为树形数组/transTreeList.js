// 获取树形数组
function transTreeList (o) {
    /*
     * 主要参数
     o.data -> 初始数组               必须
     o.id -> 用于辨识的主键            必须
     o.text -> 用于显示的内容键        必须
     o.pid -> 用于指向父节点的id键     必须
     o.tId -> 记录id的属性名，         默认为id
     o.tText -> 记录text的属性名，     默认为text
     o.tPid -> 记录pid的属性名，       默认为pid
     o.tChild -> 记录子数组的属性名    默认为children
     */
    if ( !o.data || !o.id || !o.text || !o.pid ) {
        return false;
    }
    if ( !o.tId ) {
        o.tId = 'id';
    }
    if ( !o.tText ) {
        o.tText = 'text';
    }
    if ( !o.tPid ) {
        o.tPid = 'pid';
    }
    if ( !o.tChild ) {
        o.tChild = 'children';
    }

    try {
        var data = JSON.parse(JSON.stringify(o.data));
    } catch (error) {
        return;
    }
    
	var aNoChild = [], aData = [], aTid = [];

    // 生成没有子节点的数组
    // 生成tid数组用于判断是否为根节点
    for ( var i = 0; i < data.length; i++ ) {
        var obj = data[i];
        if ( o.tId != o.id ) {
            obj[o.tId] = obj[o.id];
        }
        if ( o.tText != o.text ) {
            obj[o.tText] = obj[o.text];
        }
        if ( o.tPid != o.pid ) {
            obj[o.tPid] = obj[o.pid];
        }
        aNoChild.push(obj);
        aTid.push(obj[o.tId]);
    }

    // 生成noLevel的数组
    var aChild = [];
    for ( var i = 0; i < aNoChild.length; i++ ) {
        if ( aTid.indexOf(aNoChild[i][o.tPid]) == -1 || aNoChild[i][o.tPid] == aNoChild[i][o.tId] ) {
            aData.push(aNoChild[i]);
        } else {
            aChild.push(aNoChild[i]);
        }
    }
    for ( var i = 0; i < aChild.length; i++ ) {
        for ( var j = 0; j < aNoChild.length; j++ ) {
            if ( aNoChild[j][o.tId] == aChild[i][o.tPid] ) {
                if ( !(o.tChild in aNoChild[j]) ) {
                    aNoChild[j][o.tChild] = [];
                }
                aNoChild[j][o.tChild].push(aChild[i]);
            }
        }
    }

    return {
        aNoChild: aNoChild,
        aData: aData
    }
}
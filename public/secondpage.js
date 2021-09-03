//Priyanka Added Script for up-down right-left 

    var currentSel = null;
    function move() {
        if (arguments.length == 1) {
            moveUp(arguments[0]);
        } else if (arguments.length == 2) {
            moveRight(arguments[0], arguments[1]);
        }
    }
    function moveUp(direction) {
        if (currentSel == null) return;
        var index = currentSel.selectedIndex;
        if (direction) { //up 
            if (index == 0) return;
            var value = currentSel.options[index - 1].value;
            var text = currentSel.options[index - 1].text;
            var id = currentSel.options[index - 1].id;
            var label = currentSel.options[index - 1].label;
            var style = currentSel.options[index - 1].style;
            currentSel.options[index - 1].value = currentSel.options[index].value;
            currentSel.options[index - 1].text = currentSel.options[index].text;
            currentSel.options[index - 1].id = currentSel.options[index].id;
            currentSel.options[index - 1].label = currentSel.options[index].label;
            currentSel.options[index - 1].style = "padding:4%; margin:0;";
            currentSel.options[index].value = value;
            currentSel.options[index].text = text;
            currentSel.options[index].id = id;
            currentSel.options[index].label = label;
            currentSel.options[index].style = "padding:4%; margin:0;";
            currentSel.options[index].selected = false;
            currentSel.options[index - 1].selected = true;
        } else {
            if (index == (currentSel.length - 1)) return;
            var value = currentSel.options[index + 1].value;
            var text = currentSel.options[index + 1].text;
            var id = currentSel.options[index + 1].id;
            var label = currentSel.options[index + 1].label;
            var style = currentSel.options[index + 1].style;
            currentSel.options[index + 1].value = currentSel.options[index].value;
            currentSel.options[index + 1].text = currentSel.options[index].text;
            currentSel.options[index + 1].id = currentSel.options[index].id;
            currentSel.options[index + 1].label = currentSel.options[index].label;
            currentSel.options[index + 1].style = "padding:4%; margin:0;";
            currentSel.options[index].value = value;
            currentSel.options[index].text = text;
            currentSel.options[index].id = id;
            currentSel.options[index].label = label;
            currentSel.options[index].style = "padding:4%; margin:0;";
            currentSel.options[index].selected = false;
            currentSel.options[index + 1].selected = true;
        }
    }
    function moveRight(src, des) {
        if (src.selectedIndex == -1) {
            document.getElementById("FieldSelectNextAlert").style.display = "block";
            setTimeout(function() {
                document.getElementById("FieldSelectNextAlert").style.display = 'none';
            }, 5000);
            return;
        }
        for (var i = 0; i < src.length; i++) {
            if (src[i].selected) {
                var op = document.createElement("option");
                op.value = src.options[src.selectedIndex].value;
                op.text = src.options[src.selectedIndex].text;
                op.id = src.options[src.selectedIndex].id;
                op.style = 'padding:4%; margin:0;';
                op.label = src.options[src.selectedIndex].text;
                op.draggable = 'true';
                des.options.add(op);
                src.remove(i);
                i--;
            }
        }
        sortListDir("rightsideListInSelectField");

    }
    function func() {
        var list = document.getElementById('leftsideListInSelectField');
        b = list.getElementsByTagName("OPTION");
        const map1 = new Map();
        var list1 = [];
        for (i = 0; i < b.length; i++) {
            list1.push({
                "FieldName": b[i].text,
                "FieldType": b[i].value
            });
        }
        document.getElementById('leftsideListInSelectField').innerHTML = '';
        list1.sort((a, b) => a.FieldName.localeCompare(b.FieldName));
        for (var i = 0; i < list1.length; i++) {
            document.getElementById('leftsideListInSelectField').innerHTML += ' <option value="' + list1[i].FieldType +
                '" draggable=true  label="' + list1[i].FieldName + '" style="padding:4%; margin:0;"> ' + list1[i].FieldName + '</option><br>';
        }
    }
    function sortListDir(val) {
        var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
        list = document.getElementById(val);
        switching = true;
        dir = "desc";
        while (switching) {
            switching = false;
            b = list.getElementsByTagName("OPTION");
            for (i = 0; i < (b.length - 1); i++) {
                shouldSwitch = false;
                if (dir == "asc") {
                    if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                b[i].parentNode.insertBefore(b[i + 1], b[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }
    function setButton(obj) {
        if (obj.length == 0) return;
        currentSel = obj;
        if (obj.id == "leftsideListInSelectField") {
            document.getElementById("btnLeft").disabled = true;
            document.getElementById("btnRight").disabled = false;
            reSelect(document.getElementById("rightsideListInSelectField"));
        } else {
            document.getElementById("btnLeft").disabled = false;
            document.getElementById("btnRight").disabled = true;
            reSelect(document.getElementById("leftsideListInSelectField"));
        }
    }
    function reSelect(obj) {
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].selected) obj[i].selected = false;
        }
    }
    function closrerror() {
        document.getElementById("FieldSelectNextAlert").style.display = "none";
    }

//nitik code started

    var countOfDeWithWhereClauseValueMain = 0;
    var countOfDeWithoutWhereClauseValueMain = 0;
    var OnlyOneDeWhichContainWhereClause;
    var countOfJoinTypeWhere = 0;
    /*added by priyanka*/
    function closerunQueryAlert() {
        document.getElementById('runQueryAlert').style.display = 'none';
    }
    function openModal(functionAction) {
        var countOfDeWithWhereClauseValue = 0;
        var countOfDeWithoutWhereClauseValue = 0;
        if (DESetQueryBox.size > 0) {
            document.getElementById('uoList').innerHTML = '';
            for (const val of DESetQueryBox) {
                var temp = val + "WhereClauseValue";
                var value = document.getElementById(temp).innerHTML;
                if (value == "") {
                    countOfDeWithoutWhereClauseValue++;
                    countOfDeWithoutWhereClauseValueMain = countOfDeWithoutWhereClauseValue;
                } else {
                    OnlyOneDeWhichContainWhereClause = val;
                    countOfDeWithWhereClauseValue++;
                    countOfDeWithWhereClauseValueMain = countOfDeWithWhereClauseValue;
                    if (val in DEListMap.DEMap) {
                        document.getElementById('uoList').innerHTML += '<li id="component-selector-container-attribute groups" role="treeitem" aria-level="1" aria-selected="true" tabindex="0">' +
                            '<div class="slds-tree__item slds-is-selected" id="listbtn">' +
                            ' <span class="slds-size_1-of-1">' +
                            '<span > <button  class="btn" style=" width: 185px; margin: 0px 0px 0px 2px; padding: 0px 0px 0px 7px; margin-inline-start: 0px;" value="' + document.getElementById(temp).innerHTML + '" id="' + val + 'WhereClasueDEList' + '" draggable=true name="' + DEListMap.DEMap[val].DEName + '" >' + '<span  style=" width: 185px; text-align: left; " >' + DEListMap.DEMap[val].DEName + ' </span>' + ' </button> </span>' +
                            ' </span>' +
                            '  </div>' +
                            '</li>';
                    } else if (val in DEListMap.SharedDEMap) {
                        document.getElementById('uoList').innerHTML += '<li id="component-selector-container-attribute groups" role="treeitem" aria-level="1" aria-selected="true" tabindex="0">' +
                            '<div class="slds-tree__item slds-is-selected" id="listbtn">' +
                            ' <span class="slds-size_1-of-1">' +
                            '<span > <button  class="btn" style=" width: 185px; margin: 0px 0px 0px 2px; padding: 0px 0px 0px 7px; margin-inline-start: 0px;" value="' + document.getElementById(temp).innerHTML + '" id="' + val + 'WhereClasueDEList' + '" draggable=true name="' + DEListMap.SharedDEMap[val].DEName + '" >' + '<span  style=" width: 185px; text-align: left; " >' + DEListMap.SharedDEMap[val].DEName + ' </span>' + ' </button> </span>' +
                            ' </span>' +
                            '  </div>' +
                            '</li>';
                    } else if (val in DEListMap.DataViewMap) {
                        document.getElementById('uoList').innerHTML += '<li id="component-selector-container-attribute groups" role="treeitem" aria-level="1" aria-selected="true" tabindex="0">' +
                            '<div class="slds-tree__item slds-is-selected" id="listbtn">' +
                            ' <span class="slds-size_1-of-1">' +
                            '<span > <button  class="btn" style=" width: 185px; margin: 0px 0px 0px 2px; padding: 0px 0px 0px 7px; margin-inline-start: 0px;" value="' + document.getElementById(temp).innerHTML + '" id="' + val + 'WhereClasueDEList' + '" draggable=true name="' + DEListMap.DataViewMap[val].DEName + '" >' + '<span  style=" width: 185px; text-align: left; " >' + DEListMap.DataViewMap[val].DEName + ' </span>' + ' </button> </span>' +
                            ' </span>' +
                            '  </div>' +
                            '</li>';
                    }
                }
            }
            if (draggedDeKey.size > 0) {
                for (const valId of draggedDeKey) {
                    document.getElementById(valId + "WhereClasueDEList").className = "slds-button slds-button_brand";
                }
            }
        } else if (DESetQueryBox.size == 0) {
            document.getElementById('DESelectAlert').style.display = 'Block';
            setTimeout(function() {
                document.getElementById("DESelectAlert").style.display = 'none';
            }, 5000);
        }
        if (countOfDeWithWhereClauseValue == 1) {
            var NameOfDe = document.getElementById(OnlyOneDeWhichContainWhereClause + "WhereClasueDEList").name;
            var FieldWhereClause = document.getElementById(OnlyOneDeWhichContainWhereClause + "WhereClasueDEList").value;
            if (NameOfDe in DEListMap.DEMap) {
                for (var key in DEListMap.DEMap[NameOfDe].DEFields) {
                    var regex = new RegExp(DEListMap.DEMap[NameOfDe].DEFields[key]["FieldName"], "g")
                    FieldWhereClause = FieldWhereClause.replace(regex, '[' + DEListMap.DEMap[NameOfDe].DEName + '].[' + DEListMap.DEMap[NameOfDe].DEFields[key]["FieldName"] + ']');
                }
            } else if (NameOfDe in DEListMap.SharedDEMap) {
                for (var key in DEListMap.SharedDEMap[NameOfDe].DEFields) {
                    var regex = new RegExp(DEListMap.SharedDEMap[NameOfDe].DEFields[key]["FieldName"], "g")
                    FieldWhereClause = FieldWhereClause.replace(regex, '[' + DEListMap.SharedDEMap[NameOfDe].DEName + '].[' + DEListMap.SharedDEMap[NameOfDe].DEFields[key]["FieldName"] + ']');
                }
            } else if (NameOfDe in DEListMap.DataViewMap) {
                for (var key in DEListMap.DataViewMap[NameOfDe].DEFields) {
                    var regex = new RegExp(DEListMap.DataViewMap[NameOfDe].DEFields[key]["FieldName"], "g")
                    FieldWhereClause = FieldWhereClause.replace(regex, '[' + DEListMap.DataViewMap[NameOfDe].DEName + '].[' + DEListMap.DataViewMap[NameOfDe].DEFields[key]["FieldName"] + ']');
                }
            }
            document.getElementById('RichTextEditorForFinalWhereClause').innerHTML = FieldWhereClause;
        }
        if ((DESetQueryBox.size > 1 && isSetEqual(DESetQueryBox, joinedDivSet)) && (countOfDeWithoutWhereClauseValue < DESetQueryBox.size) && (countOfDeWithWhereClauseValue > 1)) {
            document.getElementById("backdrop").style.display = "block"
            document.getElementById("DEWhereClauseModal").style.display = "block"
            document.getElementById("DEWhereClauseModal").classList.add("show")
        } else if (((countOfDeWithoutWhereClauseValue == DESetQueryBox.size) && (isSetEqual(DESetQueryBox, joinedDivSet)) && (countOfDeWithoutWhereClauseValue > 1)) || ((countOfDeWithoutWhereClauseValue == DESetQueryBox.size) && (countOfDeWithoutWhereClauseValue == 1)) || ((countOfDeWithWhereClauseValue == 1) && (DESetQueryBox.size == 1)) || ((countOfDeWithoutWhereClauseValue == (DESetQueryBox.size - 1)) && (countOfDeWithWhereClauseValue == 1) && (isSetEqual(DESetQueryBox, joinedDivSet)))) {
            document.getElementById('DEWhereClauseModal').style.display = 'none';
            validateQuery(JoinQueryDetails, functionAction);
        } else {
            if (DESetQueryBox.size != 0) {
                document.getElementById('QueryBoxJoinAlert').style.display = 'Block';
            }
        }
        var countOfJoinType = 0;
        if (DESetQueryBox.size > 1) {
            document.getElementById('uoList2').innerHTML = '';
            for (var key in JoinQueryDetails.DEForJoin) {
                if (JoinQueryDetails.DEForJoin[key].JoinType == 'Left Outer Join with Exclusion') {
                    document.getElementById('uoList2').innerHTML += '<li id="component-selector-container-attribute groups" role="treeitem" aria-level="1" aria-selected="true" tabindex="0">' +
                        '<div class="slds-tree__item slds-is-selected" id="listbtn">' +
                        ' <span class="slds-size_1-of-1">' +
                        '<span > <button  class="btn" style=" width: 185px; margin: 0px 0px 0px 2px; padding: 0px 0px 0px 7px; margin-inline-start: 0px;" value="[' + JoinQueryDetails.DEForJoin[key].SecondDEName + '].[' + JoinQueryDetails.DEForJoin[key].SecondDEJoinField + '] IS NULL' + '"  id="[' + JoinQueryDetails.DEForJoin[key].FirstDEName + '].[' + JoinQueryDetails.DEForJoin[key].SecondDEName + ']JoinedDe" draggable=true name= "[' + JoinQueryDetails.DEForJoin[key].FirstDEName + '].[' + JoinQueryDetails.DEForJoin[key].SecondDEName + ']"   >' + '<span  style=" width: 185px; text-align: left; font-size:xx-small;" >' + "[" + JoinQueryDetails.DEForJoin[key].FirstDEName + "].[" + JoinQueryDetails.DEForJoin[key].SecondDEName + "]" + '</span>' + ' </button> </span>' +
                        ' </span>' +
                        '  </div>' +
                        '</li>';
                    countOfJoinType++;
                } else if (JoinQueryDetails.DEForJoin[key].JoinType == 'Right Outer Join with Exclusion') {
                    document.getElementById('uoList2').innerHTML += '<li id="component-selector-container-attribute groups" role="treeitem" aria-level="1" aria-selected="true" tabindex="0">' +
                        '<div class="slds-tree__item slds-is-selected" id="listbtn">' +
                        ' <span class="slds-size_1-of-1">' +
                        '<span > <button  class="btn" style=" width: 185px; margin: 0px 0px 0px 2px; padding: 0px 0px 0px 7px; margin-inline-start: 0px;" value="[' + JoinQueryDetails.DEForJoin[key].FirstDEName + '].[' + JoinQueryDetails.DEForJoin[key].FirstDEJoinField + '] IS NULL' + '"  id="[' + JoinQueryDetails.DEForJoin[key].FirstDEName + '].[' + JoinQueryDetails.DEForJoin[key].SecondDEName + '] joinedDe" draggable=true name= "[' + JoinQueryDetails.DEForJoin[key].FirstDEName + '].[' + JoinQueryDetails.DEForJoin[key].SecondDEName + ']"   >' + '<span  style=" width: 185px; text-align: left; font-size:xx-small;" >' + "[" + JoinQueryDetails.DEForJoin[key].FirstDEName + "].[" + JoinQueryDetails.DEForJoin[key].SecondDEName + "]" + '</span>' + ' </button> </span>' +
                        ' </span>' +
                        '  </div>' +
                        '</li>';
                    countOfJoinType++;
                } else if (JoinQueryDetails.DEForJoin[key].JoinType == 'Outer Join') {
                    document.getElementById('uoList2').innerHTML += '<li id="component-selector-container-attribute groups" role="treeitem" aria-level="1" aria-selected="true" tabindex="0">' +
                        '<div class="slds-tree__item slds-is-selected" id="listbtn">' +
                        ' <span class="slds-size_1-of-1">' +
                        '<span > <button  class="btn" style=" width: 185px; margin: 0px 0px 0px 2px; padding: 0px 0px 0px 7px; margin-inline-start: 0px;" value="[' + JoinQueryDetails.DEForJoin[key].FirstDEName + '].[' + JoinQueryDetails.DEForJoin[key].FirstDEJoinField + '] IS NULL OR [' + JoinQueryDetails.DEForJoin[key].SecondDEName + '].[' + JoinQueryDetails.DEForJoin[key].SecondDEJoinField + '] IS NULL"  id="[' + JoinQueryDetails.DEForJoin[key].FirstDEName + '].[' + JoinQueryDetails.DEForJoin[key].SecondDEName + '] joinedDe" draggable=true name= "[' + JoinQueryDetails.DEForJoin[key].FirstDEName + '].[' + JoinQueryDetails.DEForJoin[key].SecondDEName + ']"   >' + '<span  style=" width: 185px; text-align: left; font-size:xx-small;" >' + "[" + JoinQueryDetails.DEForJoin[key].FirstDEName + "].[" + JoinQueryDetails.DEForJoin[key].SecondDEName + "]" + '</span>' + ' </button> </span>' +
                        ' </span>' +
                        '  </div>' +
                        '</li>';
                    countOfJoinType++;
                }
            }
            if (draggedDeJoinKey.size > 0) {
                for (const valId of draggedDeJoinKey) {
                    document.getElementById(valId).className = "slds-button slds-button_brand";
                }
            }
        }
        countOfJoinTypeWhere = countOfJoinType;
    }
    function CancelDESelectAlert() {
        document.getElementById('DESelectAlert').style.display = 'none';
    }
    function CancelQueryBoxJoinAlert() {
        document.getElementById('QueryBoxJoinAlert').style.display = 'none';
    }
    function CancelDeDragAlert() {
        document.getElementById('DeDragAlert').style.display = 'none';
    }
    function CancelDEWhereClauseModal() {
        document.getElementById('DEWhereClauseModal').style.display = 'none';
    }
    function closeModal() {
        document.getElementById("backdrop").style.display = "none";
        document.getElementById("DEWhereClauseModal").style.display = "none";
        document.getElementById("DEWhereClauseModal").classList.remove("show");
        for (const Id of draggedDeKey) {
            document.getElementById(Id + "WhereClasueDEList").className = "btn";
        }
        for (const Id of draggedDeJoinKey) {
            document.getElementById(Id).className = "btn";
        }
        draggedDeJoinKey.clear();
        draggedDeKey.clear();

    }
    // Get the modal
    var modal = document.getElementById('DEWhereClauseModal');
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal()
        }
    }

//nitik code ended
// Khushboo  code starting

    //******** folder hierarchy code *********//
    var dataExtBool = true;
    var sharedDataExtBool = true;
    var dataViewsBool = true;
    function showDataExtensions() {
        var de = document.getElementById("dataExtensionButton");
        if (dataExtBool) {
            document.getElementById("dataExtension").className = "myUlClass button-padding slds-show slds-tree";
            de.innerHTML = '<span class="slds-icon_container slds-icon-utility-opened_folder" title="Description of icon when needed"><svg class="slds-icon slds-icon-text-default slds-icon_small slds-p-bottom_xx-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#opened_folder"></use><svg><span class="slds-assistive-text">Description of icon when needed</span></span><span class="tree-label" id="31244-label"><h6 style="color:#425769 ;font-size:larger;">Data Extensions</h6></span>';
            dataExtBool = false;
        } else {
            document.getElementById("dataExtension").className = "slds-hide slds-tree";
            de.innerHTML = '<span class="slds-icon_container slds-icon-utility-open_folder" title="Description of icon when needed"><svg class="slds-icon slds-icon-text-default slds-icon_small slds-p-bottom_xx-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#open_folder"></use><svg><span class="slds-assistive-text">Description of icon when needed</span></span><span class="tree-label" id="31244-label"><h6 style="color:#425769 ;font-size:larger;">Data Extensions</h6></span>';
            dataExtBool = true;
        }
    }
    function showSharedDataExtensions() {
        var de = document.getElementById("sharedDataExtensionButton");
        if (sharedDataExtBool) {
            document.getElementById("sharedDataExtension").className = "myUlClass button-padding slds-show slds-tree";
            de.innerHTML = '<span class="slds-icon_container slds-icon-utility-opened_folder" title="Description of icon when needed"><svg class="slds-icon slds-icon-text-default slds-icon_small slds-p-bottom_xx-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#opened_folder"></use><svg><span class="slds-assistive-text">Description of icon when needed</span></span><span class="tree-label" id="31244-label"><h6 style="color:#425769 ;font-size:larger;">Shared Data Extensions</h6></span>';
            sharedDataExtBool = false;
        } else {
            document.getElementById("sharedDataExtension").className = "slds-hide";
            de.innerHTML = '<span class="slds-icon_container slds-icon-utility-open_folder" title="Description of icon when needed"><svg class="slds-icon slds-icon-text-default slds-icon_small slds-p-bottom_xx-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#open_folder"></use><svg><span class="slds-assistive-text">Description of icon when needed</span></span><span class="tree-label" id="31244-label"><h6 style="color:#425769 ;font-size:larger;">Shared Data Extensions</h6></span>';
            sharedDataExtBool = true;
        }
    }
    function showDataViews() {
        var de = document.getElementById("dataViewsButton");
        if (dataViewsBool) {
            document.getElementById("dataViews").className = "myUlClass button-padding slds-show slds-tree";
            de.innerHTML = '<span class="slds-icon_container slds-icon-utility-opened_folder" title="Description of icon when needed"><svg class="slds-icon slds-icon-text-default slds-icon_small slds-p-bottom_xx-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#opened_folder"></use><svg><span class="slds-assistive-text">Description of icon when needed</span></span><span class="tree-label" id="31244-label"><h6 style="color:#425769 ;font-size:larger;text-align:left;">Data Views</h6></span>';
            dataViewsBool = false;
        } else {
            document.getElementById("dataViews").className = "slds-hide";
            de.innerHTML = '<span class="slds-icon_container slds-icon-utility-open_folder" title="Description of icon when needed"><svg class="slds-icon slds-icon-text-default slds-icon_small slds-p-bottom_xx-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#open_folder"></use><svg><span class="slds-assistive-text">Description of icon when needed</span></span><span class="tree-label" id="31244-label"><h6 style="color:#425769 ;font-size:larger;text-align:left;">Data Views</h6></span>';
            dataViewsBool = true;
        }
    }

    const BORDER_SIZE = 4;
    const panel = document.getElementById("right_panel");
    const table = document.getElementById("tableDiv");
    var hl = screen.height - (screen.height * 20) / 100;
    var hu = screen.height - (screen.height * 75) / 100;
    panel.style.height = hu + "px";
    let m_pos;
    var pHeight = 300;
    function resize(e) {
        const dx = m_pos - e.y;
        m_pos = e.y;
        var adiv = document.getElementById("RelationshipDiv").offsetHeight;
        let content = document.getElementById('tableDiv');
        let child = content.querySelector('table[name="myTable"]');
        if (child != null) {
            if (pHeight >= hu && pHeight <= hl) {
                panel.style.height = (parseInt(getComputedStyle(panel, '').height) + dx) + "px";
                pHeight = parseInt(panel.style.height);
            } else if (pHeight < hu) {
                panel.style.height = hu + "px";
                pHeight = hu;
            } else if (pHeight > hl) {
                panel.style.height = hl + "px";
                pHeight = hl;
            }
        }
    }
    panel.addEventListener("mousedown", function(e) {
        if (e.offsetY < BORDER_SIZE) {
            m_pos = e.y;
            document.addEventListener("mousemove", resize, false);
        }
    }, false);
    document.addEventListener("mouseup", function() {
        document.removeEventListener("mousemove", resize, false);
    }, false);

// Khushboo code Ending 

    var draggedDeKey = new Set();
    var draggedDeJoinKey = new Set();
    var DEDragData = {
        "DEName": '',
        "DEExtKey": '',
        "DECategory": ''
    };
    var JoinQueryDetails = {
        "PrimaryDE": {},
        "DEForJoin": []
    }
    var NewDEFieldsList = [];
    var DEListMap = {};
    var openSelectFieldsDEExtKey = '';
    var openWhereDEExtKey = '';
    var FirstDEExtKeyForJoinGlobal;
    var DESetQueryBox = new Set();
    var NewDEFieldsSet = new Set();
    var joinedDivSet = new Set();
    var data;
    var externalKey;
    //stop watch code by NITIK
    const timer = document.getElementById('stopwatch');
    var hr = 0;
    var min = 0;
    var sec = 0;
    var stoptime = true;
    function startTimer() {
        if (stoptime == true) {
            stoptime = false;
            timerCycle();
        }
    }
    function stopTimer() {
        if (stoptime == false) {
            stoptime = true;
        }
    }
    function timerCycle() {
        if (stoptime == false) {
            sec = parseInt(sec);
            min = parseInt(min);
            hr = parseInt(hr);
            sec = sec + 1;
            if (sec == 60) {
                min = min + 1;
                sec = 0;
            }
            if (min == 60) {
                hr = hr + 1;
                min = 0;
                sec = 0;
            }
            if (sec < 10 || sec == 0) {
                sec = '0' + sec;
            }
            if (min < 10 || min == 0) {
                min = '0' + min;
            }
            if (hr < 10 || hr == 0) {
                hr = '0' + hr;
            }
            timer.innerHTML = "Time " + hr + ':' + min + ':' + sec;
            setTimeout("timerCycle()", 1000);
        }
    }
    function resetTimer() {
        timer.innerHTML = 'Time 00:00:00';
        hr = 0;
        min = 0;
        sec = 0;
    }
    function cancelQueryBoxDeleteModel() {
        document.getElementById('deleteModal').style.display = 'none';
    }
    function refreshQueryDiv(DEExtKeyFordeleteDiv) {
        deleteDiv(DEExtKeyFordeleteDiv);
        document.getElementById('deleteModal').style.display = 'none';

    }
    function refreshModalDisplay() {
        var obj = document.querySelectorAll('.myRefreshClass');
        document.getElementById('refreshModal').style.display = 'none';
        if (obj.length != 0) {
            document.getElementById('refreshModal').style.display = 'block';
        }
        JoinQueryDetails = {
            "PrimaryDE": {},
            "DEForJoin": []
        }
        resetTimer()
        document.getElementById("sqlQuery").innerHTML = ""
    }
    function cancelRefreshModel() {
        document.getElementById('refreshModal').style.display = 'none';
    }
    function refreshMethod() {
        NewDEFieldsList = [];
        openSelectFieldsDEExtKey = '';
        openWhereDEExtKey = '';
        FirstDEExtKeyForJoinGlobal = '';
        DESetQueryBox = new Set();
        NewDEFieldsSet = new Set();
        joinedDivSet = new Set();
        var obj = document.querySelectorAll('.myRefreshClass');
        for (const button of obj) {
            button.remove();
        }
        document.getElementById('refreshModal').style.display = 'none';
        document.getElementById('paginationBar').style.display = 'none';
        document.getElementById('right_panel').style = "height:29%;padding-top:0%;padding-bottom: 0%;margin-bottom: 0%;"
        document.getElementById('tableDiv').innerHTML = '<div style="font-size: 17px;color:grey;height: 100%;padding-top:5%;" class="stopScroll" ><span class="slds-icon_container slds-icon-utility-database" title="Description of icon when needed"><svg class="slds-icon slds-icon-text-default slds-icon_small" aria-hidden="true" style="height: 70px;width: 70px;fill: lightgray;"><use xlink:href="assets/icons/utility-sprite/svg/symbols.svg#database"></use></svg><span class="slds-assistive-text">Description of icon when needed</span></span><span class="slds-icon_container slds-icon-utility-database" title="Description of icon when needed"><svg class="slds-icon slds-icon-text-default slds-icon_small" aria-hidden="true" style="height: 70px;width: 70px;fill: lightgray;"><use xlink:href="assets/icons/utility-sprite/svg/symbols.svg#database"></use></svg><span class="slds-assistive-text">Description of icon when needed</span></span><span class="slds-icon_container slds-icon-utility-database" title="Description of icon when needed"><svg class="slds-icon slds-icon-text-default slds-icon_small" aria-hidden="true" style="height: 70px;width: 70px;fill: lightgray;"><use xlink:href="assets/icons/utility-sprite/svg/symbols.svg#database"></use></svg><span class="slds-assistive-text">Description of icon when needed</span></span><br>Result will be shown here</div>';
    }
    var current_page = 1;
    var records_per_page = 25;
    var objJSON = [];
    function prevPage() {
        if (current_page > 1) {
            current_page--;
            changePage(current_page);
        }
    }
    function nextPage() {
        if (current_page < numPages()) {
            current_page++;
            changePage(current_page);
        }
    }
    function changePage(page) {
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        var listing_table = document.getElementById("listingTable");
        var page_span = document.getElementById("page");
        var records = document.getElementById("totalRecords");
        records.innerHTML = "( " + objJSON.length + " rows )";
        if (page < 1) {
            page = 1;
        }
        if (page > numPages()) {
            page = numPages();
        }
        listing_table.innerHTML = "";
        for (var i = (page - 1) * records_per_page; i < (page * records_per_page) && i < objJSON.length; i++) {

            listing_table.innerHTML += objJSON[i].row;
        }
        page_span.innerHTML = page;
        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }
        if (page == numPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }
    }
    function numPages() {
        return Math.ceil(objJSON.length / records_per_page);
    }
    function loadPage() {
        changePage(1);
        var page = document.getElementById("page");
        var totalPages = document.getElementById("totalPages");
        page.innerHTML = " " + 1 + " ";
        totalPages.innerHTML = " " + numPages() + " ";
    };
    //onloadofBody();
    function onloadofBody() {
        $.ajax({
            url: '/DEListFetch',
            data: {
                "assetType": "DEListFetch"
            },
            type: "POST",
            headers: {
                'Content-type': "application/json"
            },
            success: function(data) {
                DEListMap = data;
                for (var key in DEListMap.DEMap) {
                    document.getElementById("dataExtension").innerHTML += '<li aria-level="1" role="treeitem" value="DEMap" draggable="true"><button class="slds-tree__item slds-button my-button" style="color: #425769;" id="' + key + '"draggable=true value="DEMap" name="' + DEListMap.DEMap[key].DEName + '"><span class="slds-icon_container slds-icon-utility-database" title="Description of icon when needed"><svg class="slds-icon slds-icon-text-default slds-icon_small slds-p-bottom_xx-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#database"></use></svg><span class="slds-assistive-text">Description of icon when needed</span></span><span class="slds-has-flexi-truncate"><span class="slds-tree__item-label " title="' + DEListMap.DEMap[key].DEName + '">' + DEListMap.DEMap[key].DEName + ' </span></span></button></li>';
                }
                for (var key in DEListMap.SharedDEMap) {
                    document.getElementById("sharedDataExtension").innerHTML += '<li aria-level="1" role="treeitem" value="SharedDEMap" draggable="true"><button class="slds-tree__item slds-button my-button" style="color: #425769;" id="' + key + '"draggable=true value="SharedDEMap" name="' + DEListMap.SharedDEMap[key].DEName + '"><span class="slds-icon_container slds-icon-utility-database" title="Description of icon when needed"><svg class="slds-icon slds-icon-text-default slds-icon_small slds-p-bottom_xx-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#database"></use></svg><span class="slds-assistive-text">Description of icon when needed</span></span><span class="slds-has-flexi-truncate"><span class="slds-tree__item-label " title="' + DEListMap.SharedDEMap[key].DEName + '">' + DEListMap.SharedDEMap[key].DEName + ' </span></span></button></li>';
                }
                for (var key in DEListMap.DataViewMap) {
                    document.getElementById("dataViews").innerHTML += '<li aria-level="1" role="treeitem" value="DataViewMap" draggable="true"><button class="slds-tree__item slds-button my-button" style="color: #425769;" id="' + key + '"draggable=true value="DataViewMap" name="' + DEListMap.DataViewMap[key].DEName + '"><span class="slds-icon_container slds-icon-utility-database" title="Description of icon when needed"><svg class="slds-icon slds-icon-text-default slds-icon_small slds-p-bottom_xx-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#database"></use></svg><span class="slds-assistive-text">Description of icon when needed</span></span><span class="slds-has-flexi-truncate"><span class="slds-tree__item-label " title="' + DEListMap.DataViewMap[key].DEName + '">' + DEListMap.DataViewMap[key].DEName + ' </span></span></button></li>';
                }
                document.getElementById('FullPageSpinner').style.display = 'none';
                document.getElementById('DEListSidebar').style.marginTop = '0px';
            }
        });
    }
    function allowDrop(_ev, _event) {
        _ev.preventDefault();
    }
    document.ondragstart = function(_event) {
        var obj = {
            id: _event.target.id,
            value: _event.target.value,
            name: _event.target.name
        };
        console.log('Object12 ' + obj.id);

            console.log('Object12 ' + JSON.stringify(obj));
        _event.dataTransfer.setData("text/plain", JSON.stringify(obj));
    };
    document.ondragover = function(_event, _ev) {
        _event.preventDefault();
    };
    
    function drop(event, _target) {
        event.preventDefault();
        console.log("hello"+event.dataTransfer.getData("text/plain"));
        DEDragData.DEName = JSON.parse(event.dataTransfer.getData("text/plain")).name;
        console.log("hello 5");
        DEDragData.DEExtKey = JSON.parse(event.dataTransfer.getData("text/plain")).id;
        DEDragData.DECategory = JSON.parse(event.dataTransfer.getData("text/plain")).value;
        data = DEDragData.DEExtKey;
        data = data.split("WhereClasueDEList");
        //condition added by nitik
        if ((DEDragData.DEName != "AND" && DEDragData.DEName != "OR") && (data[1] != "") && (data[0][0] != "[")) {
            if (DEDragData.DEExtKey && DEDragData.DEName && DEDragData.DECategory) {
                document.getElementById('leftsideListInSelectField').innerHTML = '';
                if (DESetQueryBox.has(DEDragData.DEExtKey)) {
                    document.getElementById('DEListDivAlertPera').innerHTML = 'have already selected this ' + DEDragData.DEName + ' Data Extension.'
                    document.getElementById('DEListDivAlert').style.display = 'block';
                    setTimeout(function() {
                        document.getElementById("DEListDivAlert").style.display = 'none';
                    }, 5000);
                } else {
                    document.getElementById('DEListDivAlert').style.display = 'none';
                    document.getElementById("modal-heading-01").innerHTML = DEDragData.DEName + " Data Extension Fields";
                    if (DEDragData.DECategory == "DEMap") {
                        document.getElementById('DEnamemodal1').innerHTML = DEDragData.DEName;
                        DEListMap.DEMap[DEDragData.DEExtKey].DEFields.sort((a, b) => a.FieldName.localeCompare(b.FieldName));
                        for (var i = 0; i < DEListMap.DEMap[DEDragData.DEExtKey].DEFields.length; i++) {
                            document.getElementById('leftsideListInSelectField').innerHTML += ' <option value="' + DEListMap.DEMap[DEDragData.DEExtKey].DEFields[i].FieldType +
                                '" id="' + DEDragData.DEExtKey + '" draggable=true  label="' + DEListMap.DEMap[DEDragData.DEExtKey].DEFields[i].FieldName + '" style="padding:4%; margin:0;"> ' + DEListMap.DEMap[DEDragData.DEExtKey].DEFields[i].FieldName + '</option><br>';
                        }
                    } else if (DEDragData.DECategory == "SharedDEMap") {
                        document.getElementById('DEnamemodal1').innerHTML = DEDragData.DEName;
                        DEListMap.SharedDEMap[DEDragData.DEExtKey].DEFields.sort((a, b) => a.FieldName.localeCompare(b.FieldName));
                        for (var i = 0; i < DEListMap.SharedDEMap[DEDragData.DEExtKey].DEFields.length; i++) {
                            document.getElementById('leftsideListInSelectField').innerHTML += ' <option value="' + DEListMap.SharedDEMap[DEDragData.DEExtKey].DEFields[i].FieldType +
                                '" id="' + DEDragData.DEExtKey + '" draggable=true name="' + DEListMap.SharedDEMap[DEDragData.DEExtKey].DEFields[i].FieldName +
                                '" label="' + DEListMap.SharedDEMap[DEDragData.DEExtKey].DEFields[i].FieldName + '" style="padding:4%; margin:0;"> ' + DEListMap.SharedDEMap[DEDragData.DEExtKey].DEFields[i].FieldName + '</option><br>';
                        }
                    } else if (DEDragData.DECategory == "DataViewMap") {
                        document.getElementById('DEnamemodal1').innerHTML = DEDragData.DEName;
                        DEListMap.DataViewMap[DEDragData.DEExtKey].DEFields.sort((a, b) => a.FieldName.localeCompare(b.FieldName));
                        for (var i = 0; i < DEListMap.DataViewMap[DEDragData.DEExtKey].DEFields.length; i++) {
                            document.getElementById('leftsideListInSelectField').innerHTML += ' <option value="' + DEListMap.DataViewMap[DEDragData.DEExtKey].DEFields[i].FieldType +
                                '" id="' + DEDragData.DEExtKey + '" draggable=true name="' + DEListMap.DataViewMap[DEDragData.DEExtKey].DEFields[i].FieldName +
                                '" label="' + DEListMap.DataViewMap[DEDragData.DEExtKey].DEFields[i].FieldName + '" style="padding:4%; margin:0;"> ' + DEListMap.DataViewMap[DEDragData.DEExtKey].DEFields[i].FieldName + '</option><br>';
                          }
                    }
                    document.getElementById('RelationPopup').style.display = 'block';
                }
            }
        }
    };
    //script added by nitik for moving 
    function drop2(event, _target) {
        event.preventDefault();
        var DEWhereClauseDragData = {
            "FieldType": JSON.parse(event.dataTransfer.getData("text/plain")).name,
            "FieldName": JSON.parse(event.dataTransfer.getData("text/plain")).value,
            "FieldKey": JSON.parse(event.dataTransfer.getData("text/plain")).id
        }
        if (DEWhereClauseDragData.FieldName != null) {
            insertTextAtCaret(DEWhereClauseDragData.FieldName, DEWhereClauseDragData.FieldKey, DEWhereClauseDragData.FieldType);
            function insertTextAtCaret(FieldName, FieldKey, FieldType) {
                var sel, range, JoineDeWhereClause;
                if (window.getSelection) {
                    sel = window.getSelection();
                    var parentID = window.getSelection().anchorNode.parentNode.id;
                    var anchorID = window.getSelection().anchorNode.id;
                    var superparentID = window.getSelection().anchorNode.parentNode.parentNode.id;
                    if (parentID == 'RichTextEditor' || anchorID == 'RichTextEditor' || superparentID == 'RichTextEditor') {
                        if (sel.getRangeAt && sel.rangeCount) {
                            range = sel.getRangeAt(0);
                            range.deleteContents();
                            range.insertNode(document.createTextNode(FieldName));
                        }
                    } else if (parentID == 'RichTextEditorForFinalWhereClause' || anchorID == 'RichTextEditorForFinalWhereClause' || superparentID == 'RichTextEditorForFinalWhereClause') {
                        if (sel.getRangeAt && sel.rangeCount) {
                            range = sel.getRangeAt(0);
                            range.deleteContents();
                            if (FieldKey.charAt(0) == "[") {
                                document.getElementById(FieldKey).className = "slds-button slds-button_brand";
                                range.insertNode(document.createTextNode(' ( ' + FieldName + ' ) '));
                            } else if (FieldKey == "And" || FieldKey == "Or") {
                                range.insertNode(document.createTextNode(' ' + FieldName + ' '));
                            } else {
                                key = FieldKey.split("WhereClasueDEList");
                                FieldId = key[0];
                                document.getElementById(FieldKey).className = "slds-button slds-button_brand";
                                if (FieldType in DEListMap.DEMap) {
                                    for (var key in DEListMap.DEMap[FieldType].DEFields) {
                                        var regex = new RegExp(DEListMap.DEMap[FieldType].DEFields[key]["FieldName"], "g")
                                        FieldName = FieldName.replace(regex, '[' + DEListMap.DEMap[FieldType].DEName + '].[' + DEListMap.DEMap[FieldType].DEFields[key]["FieldName"] + ']');
                                    }
                                } else if (FieldType in DEListMap.SharedDEMap) {
                                    for (var key in DEListMap.SharedDEMap[FieldType].DEFields) {
                                        var regex = new RegExp(DEListMap.SharedDEMap[FieldType].DEFields[key]["FieldName"], "g")
                                        FieldName = FieldName.replace(regex, '[' + DEListMap.SharedDEMap[FieldType].DEName + '].[' + DEListMap.SharedDEMap[FieldType].DEFields[key]["FieldName"] + ']');
                                    }
                                } else if (FieldType in DEListMap.DataViewMap) {
                                    for (var key in DEListMap.DataViewMap[FieldType].DEFields) {
                                        var regex = new RegExp(DEListMap.DataViewMap[FieldType].DEFields[key]["FieldName"], "g")
                                        FieldName = FieldName.replace(regex, '[' + DEListMap.DataViewMap[FieldType].DEName + '].[' + DEListMap.DataViewMap[FieldType].DEFields[key]["FieldName"] + ']');
                                    }
                                }
                                range.insertNode(document.createTextNode(' ( ' + FieldName + ' ) '));
                            }
                        }
                    }
                }
            }
        }
    };
    function Previous() {
        if (DEDragData.DEExtKey != '') {
            document.getElementById('SecondModal').style.display = 'none';
            document.getElementById('RelationPopup').style.display = 'block';
            document.getElementById('ulList').innerHTML = '';
        }
        if (openSelectFieldsDEExtKey != '') {
            document.getElementById('SecondModal').style.display = 'none';
            document.getElementById('RelationPopup').style.display = 'block';
            document.getElementById('ulList').innerHTML = '';
            document.getElementById('leftsideListInSelectField').innerHTML = '';
            OpenSelectField(openSelectFieldsDEExtKey + "OpenSelectField");
        }
        if (openWhereDEExtKey != '') {
            document.getElementById('SecondModal').style.display = 'none';
            document.getElementById('RelationPopup').style.display = 'block';
            document.getElementById('ulList').innerHTML = '';
            document.getElementById('leftsideListInSelectField').innerHTML = '';
            OpenSelectField(openWhereDEExtKey + "OpenSelectField");
        }
    }
    function validateQuery(JoinQueryDetails, actionType) {
        resetTimer()
        if (actionType == "Run") {
            startTimer()
        }
        if (DESetQueryBox.size > 1) {
            if (((isSetEqual(DESetQueryBox, draggedDeKey) == 0) && (countOfDeWithoutWhereClauseValueMain != DESetQueryBox.size) && (countOfDeWithWhereClauseValueMain != 1)) || (draggedDeJoinKey.size != countOfJoinTypeWhere)) {
                document.getElementById('DeDragAlert').style.display = 'Block';
                return
            }
        }
        document.getElementById('MainDivAlert').style.display = 'none';
        document.getElementById('FullPageSpinner').style.display = 'block';
        document.getElementById('DEListSidebar').style.marginTop = '-650px';
        var strQuery = 'SELECT';
        var DENameForQuery = '';
        if (DESetQueryBox.size == 1) {
            if (Array.from(DESetQueryBox)[0] in DEListMap.DEMap) {
                DENameForQuery = DEListMap.DEMap[Array.from(DESetQueryBox)[0]].DEName;
                if (DENameForQuery[0] == '_') {
                    DENameForQuery = DENameForQuery.substring(1);
                }
                for (var i in DEListMap.DEMap[Array.from(DESetQueryBox)[0]].DESelectedFields) {
                    strQuery += ' [' + DEListMap.DEMap[Array.from(DESetQueryBox)[0]].DESelectedFields[i]["FieldName"] + '] as [' + DENameForQuery + ' ' + DEListMap.DEMap[Array.from(DESetQueryBox)[0]].DESelectedFields[i]["FieldName"] + '],';
                }
                strQuery = strQuery.slice(0, -1);
                strQuery += ' FROM [' + DEListMap.DEMap[Array.from(DESetQueryBox)[0]].DEName + ']';
                var whereClauseValue = document.getElementById(Array.from(DESetQueryBox)[0] + 'WhereClauseValue').innerHTML;
                if (whereClauseValue != '') {
                    for (var key in DEListMap.DEMap[Array.from(DESetQueryBox)[0]].DEFields) {
                        var regex = new RegExp(DEListMap.DEMap[Array.from(DESetQueryBox)[0]].DEFields[key]["FieldName"], "g")
                        whereClauseValue = whereClauseValue.replace(regex, '[' + DEListMap.DEMap[Array.from(DESetQueryBox)[0]].DEName + '].[' + DEListMap.DEMap[Array.from(DESetQueryBox)[0]].DEFields[key]["FieldName"] + ']');
                    }
                    strQuery += ' WHERE ' + whereClauseValue;
                }
            } else if (Array.from(DESetQueryBox)[0] in DEListMap.SharedDEMap) {
                DENameForQuery = DEListMap.SharedDEMap[Array.from(DESetQueryBox)[0]].DEName;
                if (DENameForQuery[0] == '_') {
                    DENameForQuery = DENameForQuery.substring(1);
                }
                for (var i in DEListMap.SharedDEMap[Array.from(DESetQueryBox)[0]].DESelectedFields) {
                    strQuery += ' [' + DEListMap.SharedDEMap[Array.from(DESetQueryBox)[0]].DESelectedFields[i]["FieldName"] + '] as [' + DENameForQuery + ' ' + DEListMap.SharedDEMap[Array.from(DESetQueryBox)[0]].DESelectedFields[i]["FieldName"] + '],';
                }
                strQuery = strQuery.slice(0, -1);
                strQuery += ' FROM ent.[' + DEListMap.SharedDEMap[Array.from(DESetQueryBox)[0]].DEName + ']';
                var whereClauseValue = document.getElementById(Array.from(DESetQueryBox)[0] + 'WhereClauseValue').innerHTML;
                if (whereClauseValue != '') {
                    for (var key in DEListMap.SharedDEMap[Array.from(DESetQueryBox)[0]].DEFields) {
                        var regex = new RegExp(DEListMap.SharedDEMap[Array.from(DESetQueryBox)[0]].DEFields[key]["FieldName"], "g")
                        whereClauseValue = whereClauseValue.replace(regex, '[' + DEListMap.SharedDEMap[Array.from(DESetQueryBox)[0]].DEName + '].[' + DEListMap.SharedDEMap[Array.from(DESetQueryBox)[0]].DEFields[key]["FieldName"] + ']');
                    }
                    strQuery += ' WHERE ' + whereClauseValue;
                }
            } else if (Array.from(DESetQueryBox)[0] in DEListMap.DataViewMap) {
                DENameForQuery = DEListMap.DataViewMap[Array.from(DESetQueryBox)[0]].DEName;
                if (DENameForQuery[0] == '_') {
                    DENameForQuery = DENameForQuery.substring(1);
                }
                for (var i in DEListMap.DataViewMap[Array.from(DESetQueryBox)[0]].DESelectedFields) {
                    strQuery += ' [' + DEListMap.DataViewMap[Array.from(DESetQueryBox)[0]].DESelectedFields[i]["FieldName"] + '] as [' + DENameForQuery + ' ' + DEListMap.DataViewMap[Array.from(DESetQueryBox)[0]].DESelectedFields[i]["FieldName"] + '],';
                }
                strQuery = strQuery.slice(0, -1);
                strQuery += ' FROM [' + DEListMap.DataViewMap[Array.from(DESetQueryBox)[0]].DEName + ']';
                var whereClauseValue = document.getElementById(Array.from(DESetQueryBox)[0] + 'WhereClauseValue').innerHTML;
                if (whereClauseValue != '') {
                    for (var key in DEListMap.DataViewMap[Array.from(DESetQueryBox)[0]].DEFields) {
                        var regex = new RegExp(DEListMap.DataViewMap[Array.from(DESetQueryBox)[0]].DEFields[key]["FieldName"], "g")
                        whereClauseValue = whereClauseValue.replace(regex, '[' + DEListMap.DataViewMap[Array.from(DESetQueryBox)[0]].DEName + '].[' + DEListMap.DataViewMap[Array.from(DESetQueryBox)[0]].DEFields[key]["FieldName"] + ']');
                    }
                    strQuery += ' WHERE ' + whereClauseValue;
                }
            }
            document.getElementById("sqlQuery").innerHTML = strQuery;
        } else if (DESetQueryBox.size > 1 && isSetEqual(DESetQueryBox, joinedDivSet)) {
            for (const k of DESetQueryBox) {
                if (k in DEListMap.DEMap) {
                    DENameForQuery = DEListMap.DEMap[k].DEName;
                    if (DENameForQuery[0] == '_') {
                        DENameForQuery = DENameForQuery.substring(1);
                    }
                    for (var Field1 of DEListMap.DEMap[k].DESelectedFields) {
                        strQuery += ' [' + DEListMap.DEMap[k].DEName + '].[' + Field1.FieldName + '] as [' + DENameForQuery + ' ' + Field1.FieldName + '],';
                    }
                } else if (k in DEListMap.SharedDEMap) {
                    DENameForQuery = DEListMap.SharedDEMap[k].DEName;
                    if (DENameForQuery[0] == '_') {
                        DENameForQuery = DENameForQuery.substring(1);
                    }
                    for (var Field1 of DEListMap.SharedDEMap[k].DESelectedFields) {
                        strQuery += ' [' + DEListMap.SharedDEMap[k].DEName + '].[' + Field1.FieldName + '] as [' + DENameForQuery + ' ' + Field1.FieldName + '],';
                    }
                } else if (k in DEListMap.DataViewMap) {
                    DENameForQuery = DEListMap.DataViewMap[k].DEName;
                    if (DENameForQuery[0] == '_') {
                        DENameForQuery = DENameForQuery.substring(1);
                    }
                    for (var Field1 of DEListMap.DataViewMap[k].DESelectedFields) {
                        strQuery += ' [' + DEListMap.DataViewMap[k].DEName + '].[' + Field1.FieldName + '] as [' + DENameForQuery + ' ' + Field1.FieldName + '],';
                    }
                }
            }
            strQuery = strQuery.slice(0, -1);
            if (JoinQueryDetails.PrimaryDE.DEName in DEListMap.SharedDEMap) {
                strQuery += ' FROM ent.[' + JoinQueryDetails.PrimaryDE.DEName + ']';
            } else {
                strQuery += ' FROM [' + JoinQueryDetails.PrimaryDE.DEName + ']';
            }
            for (var key in JoinQueryDetails.DEForJoin) {
                if (JoinQueryDetails.DEForJoin[key].SecondDEExtKey in DEListMap.SharedDEMap) {
                    var SecondDeIfShared = 'ent.[' + JoinQueryDetails.DEForJoin[key].SecondDEName + ']';
                } else {
                    var SecondDeIfShared = '[' + JoinQueryDetails.DEForJoin[key].SecondDEName + ']';
                }
                strQuery = JoinTypeQueryStringAdd(strQuery, JoinQueryDetails.DEForJoin[key].JoinType, JoinQueryDetails.DEForJoin[key].FirstDEName, JoinQueryDetails.DEForJoin[key].FirstDEJoinField, JoinQueryDetails.DEForJoin[key].SecondDEName, JoinQueryDetails.DEForJoin[key].SecondDEJoinField, SecondDeIfShared);
            }
            if (DESetQueryBox.size == countOfDeWithoutWhereClauseValueMain) {}
            else if (countOfDeWithWhereClauseValueMain > 1 || countOfDeWithWhereClauseValueMain == 1) {
                strQuery = strQuery + " Where ";
                var clause = document.getElementById("RichTextEditorForFinalWhereClause").innerHTML;
                strQuery = strQuery + clause;
            }
            document.getElementById("sqlQuery").innerHTML = strQuery;
        } else {
            document.getElementById('MainDivAlert').style.display = 'Block';
            document.getElementById('FullPageSpinner').style.display = 'none';
        }
        if (strQuery != 'SELECT' && DESetQueryBox.size > 0) {
            for (var DEExtKeyForNewDEFieldsSet of Array.from(DESetQueryBox)) {
                if (DEExtKeyForNewDEFieldsSet in DEListMap.DEMap) {
                    for (var Field of DEListMap.DEMap[DEExtKeyForNewDEFieldsSet].DESelectedFields) {
                        NewDEFieldsSet.add(JSON.stringify({
                            "FieldName": DEListMap.DEMap[DEExtKeyForNewDEFieldsSet].DEName + " " + Field.FieldName,
                            "FieldType": Field.FieldType
                        }));
                    }
                } else if (DEExtKeyForNewDEFieldsSet in DEListMap.SharedDEMap) {
                    for (var Field of DEListMap.SharedDEMap[DEExtKeyForNewDEFieldsSet].DESelectedFields) {
                        NewDEFieldsSet.add(JSON.stringify({
                            "FieldName": DEListMap.SharedDEMap[DEExtKeyForNewDEFieldsSet].DEName + " " + Field.FieldName,
                            "FieldType": Field.FieldType
                        }));
                    }
                } else if (DEExtKeyForNewDEFieldsSet in DEListMap.DataViewMap) {
                    for (var Field of DEListMap.DataViewMap[DEExtKeyForNewDEFieldsSet].DESelectedFields) {
                        NewDEFieldsSet.add(JSON.stringify({
                            "FieldName": DEListMap.DataViewMap[DEExtKeyForNewDEFieldsSet].DEName + " " + Field.FieldName,
                            "FieldType": Field.FieldType
                        }));
                    }
                }
            }
            NewDEFieldsList = [];
            for (var val of Array.from(NewDEFieldsSet)) {
                NewDEFieldsList.push(JSON.parse(val));
            }
            $.ajax({
                url: '/validatequery',
                data: {
                    'dynamicQuery': strQuery,
                    'actionType': actionType,
                    'NewDEFieldsList': NewDEFieldsList
                },
                type: "POST",
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                success: function(data) {
                    if (actionType == "Validate" && data.IsQueryValid == true) {
                        document.getElementById('QueryValidateTrueAlert').style.display = 'block';
                        document.getElementById('QueryValidateFalseAlert').style.display = 'none';
                        document.getElementById('FullPageSpinner').style.display = 'none';
                        document.getElementById('DEListSidebar').style.marginTop = '0px';
                        setTimeout(function() {
                            document.getElementById("QueryValidateTrueAlert").style.display = 'none';
                        }, 5000);
                    } else if (actionType == "Validate" && data.IsQueryValid == false) {
                        document.getElementById('QueryValidateTrueAlert').style.display = 'none';
                        document.getElementById('msgQueryValidateFalseAlert').innerHTML = 'Query Validate ErrorMsg : ' + data.ErrorMsg;
                        document.getElementById('QueryValidateFalseAlert').style.display = 'block';
                        document.getElementById('FullPageSpinner').style.display = 'none';
                        document.getElementById('DEListSidebar').style.marginTop = '0px';
                        setTimeout(function() {
                            document.getElementById("QueryValidateFalseAlert").style.display = 'none';
                        }, 5000);;
                    } else if (actionType == "Run" && data.IsQueryValid == true) {
                        var b = setInterval(function() {
                            DERecordGetClient(b);
                        }, 3000);
                    } else if (actionType == "Run" && data.IsQueryValid == false) {
                        document.getElementById('QueryValidateTrueAlert').style.display = 'none';
                        document.getElementById('QueryValidateFalseAlert').style.display = 'block';
                        document.getElementById('FullPageSpinner').style.display = 'none';
                        document.getElementById('DEListSidebar').style.marginTop = '0px';
                        stopTimer()
                    }
                }
            })
        } else {
            document.getElementById('FullPageSpinner').style.display = 'none';
            document.getElementById('DEListSidebar').style.marginTop = '0px';
        }
        function JoinTypeQueryStringAdd(queryStr, JoinType, FirstDE, FirstDEJoinField, SecondDE, SecondDEJoinField, SecondDeIfShared) {
            if (JoinType == 'Left Outer Join') {
                queryStr += ' LEFT JOIN ' + SecondDeIfShared + ' ON [' + FirstDE + '].[' + FirstDEJoinField + '] = [' + SecondDE + '].[' + SecondDEJoinField + ']';
            } else if (JoinType == 'Left Outer Join with Exclusion') {
                queryStr += ' LEFT JOIN ' + SecondDeIfShared + ' ON [' + FirstDE + '].[' + FirstDEJoinField + '] = [' + SecondDE + '].[' + SecondDEJoinField + ']';
            } else if (JoinType == 'Right Outer Join') {
                queryStr += ' RIGHT JOIN ' + SecondDeIfShared + ' ON [' + FirstDE + '].[' + FirstDEJoinField + '] = [' + SecondDE + '].[' + SecondDEJoinField + ']';
            } else if (JoinType == 'Right Outer Join with Exclusion') {
                queryStr += ' RIGHT JOIN ' + SecondDeIfShared + ' ON [' + FirstDE + '].[' + FirstDEJoinField + '] = [' + SecondDE + '].[' + SecondDEJoinField + ']';
            } else if (JoinType == 'Inner Join') {
                queryStr += ' INNER JOIN ' + SecondDeIfShared + ' ON [' + FirstDE + '].[' + FirstDEJoinField + '] = [' + SecondDE + '].[' + SecondDEJoinField + ']';
            } else if (JoinType == 'Full Outer Join') {
                queryStr += ' FULL OUTER JOIN ' + SecondDeIfShared + ' ON [' + FirstDE + '].[' + FirstDEJoinField + '] = [' + SecondDE + '].[' + SecondDEJoinField + ']';
            } else if (JoinType == 'Outer Join') {
                queryStr += ' FULL OUTER JOIN ' + SecondDeIfShared + ' ON [' + FirstDE + '].[' + FirstDEJoinField + '] = [' + SecondDE + '].[' + SecondDEJoinField + ']';
            }
            return queryStr;
        }
        function DERecordGetClient(b) {
            $.ajax({
                url: '/DERecordGet',
                data: {
                    'DERecordGet': "True"
                },
                type: "POST",
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                success: function(data) {
                    if (data != "false" && data) {
                        DEListShow(data);
                        document.getElementById('FullPageSpinner').style.display = 'none';
                        document.getElementById('DEListSidebar').style.marginTop = '0px';
                        clearInterval(b);
                        stopTimer()
                    }
                }
            })
            function DEListShow(DERecords) {
                objJSON = [];
                var DETableBody = ""
                var tableBody = "";
                if (DERecords.length != 0) {
                    DETableBody = '<table class="slds-table slds-table_bordered slds-table--header-fixed" aria-labelledby="element-with-table-label other-element-with-table-label" name="myTable" style="border:1px solid rgb(177, 172, 172) !important;">' +
                        '<thead>' +
                        '<tr class="slds-line-height_reset">';
                    for (var key in DERecords[0]) {
                        DETableBody += '  <th class="slds-text-title_caps slds-cell-wrap" scope="col"><div class="slds-truncate" title="firstname">' + key + '</div></th>';
                    }
                    DETableBody += '</tr>' +
                        '</thead>' +
                        '<tbody id="listingTable">';
                    DETableBody += '</tbody>' +
                        '</table>';
                    for (var i in DERecords) {
                        tableBody = '<tr class="slds-hint-parent">';
                        for (var key in DERecords[i]) {
                            tableBody += '<td data-label="' + key + '" id="' + key + '">' + DERecords[i][key] + '</td>';
                        }
                        tableBody += '</tr>';
                        objJSON.push({
                            row: tableBody
                        });
                    }
                    document.getElementById('paginationBar').style.display = 'block';
                    document.getElementById('right_panel').style = "height:30%;padding-top:0%;padding-bottom: 3%;margin-bottom: 0%;";
                    document.getElementById('tableDiv').innerHTML = DETableBody;
                    document.getElementById('paginationBar').style.display = 'block';
                    loadPage();
                } else {
                    document.getElementById('right_panel').style = "height:29%;padding-top:0%;padding-bottom: 0%;margin-bottom: 0%;"
                    document.getElementById('paginationBar').style.display = 'none';
                    document.getElementById('tableDiv').innerHTML = '<div style="height: 99%;background-color: white;display:block;padding-top:2%;" id="noRecordFoundDiv"><div class="slds-text-align_center" style="font-size: larger;color: #425769;">No record found<br><img src="noRecord.png" alt="Girl in a jacket" style="width: 250px;" ></div></div>';
                }
            }
        }
        if (draggedDeKey.size > 1) {
            closeModal();
        } else {
            countOfDeWithWhereClauseValueMain = 0;
            countOfDeWithoutWhereClauseValueMain = 0;
        }
        if (DESetQueryBox.size == 1) {
            var t = document.getElementById('RichTextEditorForFinalWhereClause').innerHTML;
            if (t != '') {
                document.getElementById('RichTextEditorForFinalWhereClause').innerHTML = '';
            }
        }
    }
    function isSetEqual(as, bs) {
        if (as.size !== bs.size) return 0;
        for (var a of as)
            if (!bs.has(a)) return 1;
        return 1;
    }
    function CancelDERecordModal() {
        document.getElementById('recordResultModal').style.display = 'none';
    }
    function Next() {
        document.getElementById("RichTextEditor").innerHTML = '';
        document.getElementById("rightsideListInSelectField").querySelectorAll("option");
        if (document.getElementById("rightsideListInSelectField").querySelectorAll("option").length > 0) {
            document.getElementById('RelationPopup').style.display = 'none';
            document.getElementById('SecondModal').style.display = 'block';
            document.getElementById('FieldSelectNextAlert').style.display = 'none';
            document.getElementById('ulList').innerHTML = '';
            if (openSelectFieldsDEExtKey == '') {
                if (DEDragData.DEExtKey in DEListMap.DEMap) {
                    document.getElementById('DEnamemodal2').innerHTML = DEDragData.DEName;
                    for (var i = 0; i < DEListMap.DEMap[DEDragData.DEExtKey].DEFields.length; i++) {
                        document.getElementById('ulList').innerHTML += '<li id="component-selector-container-attribute groups" role="treeitem" aria-level="1" aria-selected="true" tabindex="0">' +
                            '<div class="slds-tree__item slds-is-selected" id="listbtn">' +
                            ' <span class="slds-size_1-of-1">' +
                            '<span > <button  class="btn" value="' + DEListMap.DEMap[DEDragData.DEExtKey].DEFields[i].FieldName + '" id="' + DEDragData.DEExtKey + '" draggable=true name="' + DEListMap.DEMap[DEDragData.DEExtKey].DEFields[i].FieldType + '" >' + DEListMap.DEMap[DEDragData.DEExtKey].DEFields[i].FieldName + ' </button> </span>' +
                            ' </span>' +
                            '  </div>' +
                            '</li>';
                    }
                } else if (DEDragData.DEExtKey in DEListMap.SharedDEMap) {
                    document.getElementById('DEnamemodal2').innerHTML = DEDragData.DEName;
                    for (var i = 0; i < DEListMap.SharedDEMap[DEDragData.DEExtKey].DEFields.length; i++) {
                        document.getElementById('ulList').innerHTML += '<li id="component-selector-container-attribute groups" role="treeitem" aria-level="1" aria-selected="true" tabindex="0">' +
                            '<div class="slds-tree__item slds-is-selected" id="listbtn">' +
                            ' <span class="slds-size_1-of-1">' +
                            '<span > <button  class="btn" value="' + DEListMap.SharedDEMap[DEDragData.DEExtKey].DEFields[i].FieldName + '" id="' + DEDragData.DEExtKey + '" draggable=true name="' + DEListMap.SharedDEMap[DEDragData.DEExtKey].DEFields[i].FieldType + '" >' + DEListMap.SharedDEMap[DEDragData.DEExtKey].DEFields[i].FieldName + ' </button> </span>' +
                            ' </span>' +
                            '  </div>' +
                            '</li>';
                    }
                } else if (DEDragData.DEExtKey in DEListMap.DataViewMap) {
                    document.getElementById('DEnamemodal2').innerHTML = DEDragData.DEName;
                    for (var i = 0; i < DEListMap.DataViewMap[DEDragData.DEExtKey].DEFields.length; i++) {
                        document.getElementById('ulList').innerHTML += '<li id="component-selector-container-attribute groups" role="treeitem" aria-level="1" aria-selected="true" tabindex="0">' +
                            '<div class="slds-tree__item slds-is-selected" id="listbtn">' +
                            ' <span class="slds-size_1-of-1">' +
                            '<span > <button  class="btn" value="' + DEListMap.DataViewMap[DEDragData.DEExtKey].DEFields[i].FieldName + '" id="' + DEDragData.DEExtKey + '" draggable=true name="' + DEListMap.DataViewMap[DEDragData.DEExtKey].DEFields[i].FieldType + '" >' + DEListMap.DataViewMap[DEDragData.DEExtKey].DEFields[i].FieldName + ' </button> </span>' +
                            ' </span>' +
                            '  </div>' +
                            '</li>';
                    }
                }
            } else {
                OpenWhere(openSelectFieldsDEExtKey + 'OpenWhere');
            }
        } else {
            document.getElementById('FieldSelectNextAlert').style.display = 'Block';
        }
    }
    function CancelQueryBoxAlert() {
        document.getElementById('MainDivAlert').style.display = 'none';
    }
    function CancelFieldSelectNextAlert() {
        document.getElementById('FieldSelectNextAlert').style.display = 'none';
    }
    function CancelDEListDivAlert() {
        document.getElementById('DEListDivAlert').style.display = 'none';
    }
    function CancelQueryValidateTrueAlert() {
        document.getElementById('QueryValidateTrueAlert').style.display = 'none';
    }
    function CancelQueryValidateFalseAlert() {
        document.getElementById('QueryValidateFalseAlert').style.display = 'none';
    }       
    function CancelPopup() {
        document.getElementById('FieldSelectNextAlert').style.display = 'none';
        document.getElementById('leftsideListInSelectField').innerHTML = '';
        document.getElementById('rightsideListInSelectField').innerHTML = '';
        document.getElementById('ulList').innerHTML = '';
        document.getElementById('RichTextEditor').innerHTML = '';
        document.getElementById('RelationPopup').style.display = 'none';
        document.getElementById('SecondModal').style.display = 'none';
        openWhereDEExtKey = '';
        openSelectFieldsDEExtKey = '';
        DEDragData = {
            "DEName": '',
            "DEExtKey": '',
            "DECategory": ''
        }
    }
    function OpenWhere(EleDEExtKey) {
        EleDEExtKey = EleDEExtKey.split("OpenWhere");
        EleDEExtKey = EleDEExtKey[0];
        openWhereDEExtKey = EleDEExtKey;
        var ulListStr = '';
        if (openWhereDEExtKey in DEListMap.DEMap) {
            for (var key in DEListMap.DEMap[openWhereDEExtKey].DEFields) {
                ulListStr += '<li id="component-selector-container-attribute groups" role="treeitem" aria-level="1" aria-selected="true" tabindex="0">' +
                    '<div class="slds-tree__item slds-is-selected" id="listbtn">' +
                    ' <span class="slds-size_1-of-1">' +
                    '<span > <button  class="btn" value="' + DEListMap.DEMap[openWhereDEExtKey].DEFields[key]["FieldName"] + '" id="' + openWhereDEExtKey + '" draggable=true name="' + DEListMap.DEMap[openWhereDEExtKey].DEFields[key]["FieldType"] + '" >' + DEListMap.DEMap[openWhereDEExtKey].DEFields[key]["FieldName"] + ' </button> </span>' +
                    ' </span>' +
                    '  </div>' +
                    '</li>';
            }
        } else if (openWhereDEExtKey in DEListMap.SharedDEMap) {
            for (var key in DEListMap.SharedDEMap[openWhereDEExtKey].DEFields) {
                ulListStr += '<li id="component-selector-container-attribute groups" role="treeitem" aria-level="1" aria-selected="true" tabindex="0">' +
                    '<div class="slds-tree__item slds-is-selected" id="listbtn">' +
                    ' <span class="slds-size_1-of-1">' +
                    '<span > <button  class="btn" value="' + DEListMap.SharedDEMap[openWhereDEExtKey].DEFields[key]["FieldName"] + '" id="' + openWhereDEExtKey + '" draggable=true name="' + DEListMap.SharedDEMap[openWhereDEExtKey].DEFields[key]["FieldType"] + '" >' + DEListMap.SharedDEMap[openWhereDEExtKey].DEFields[key]["FieldName"] + ' </button> </span>' +
                    ' </span>' +
                    '  </div>' +
                    '</li>';
            }
        } else if (openWhereDEExtKey in DEListMap.DataViewMap) {
            for (var key in DEListMap.DataViewMap[openWhereDEExtKey].DEFields) {
                ulListStr += '<li id="component-selector-container-attribute groups" role="treeitem" aria-level="1" aria-selected="true" tabindex="0">' +
                    '<div class="slds-tree__item slds-is-selected" id="listbtn">' +
                    ' <span class="slds-size_1-of-1">' +
                    '<span > <button  class="btn" value="' + DEListMap.DataViewMap[openWhereDEExtKey].DEFields[key]["FieldName"] + '" id="' + openWhereDEExtKey + '" draggable=true name="' + DEListMap.DataViewMap[openWhereDEExtKey].DEFields[key]["FieldType"] + '" >' + DEListMap.DataViewMap[openWhereDEExtKey].DEFields[key]["FieldName"] + ' </button> </span>' +
                    ' </span>' +
                    '  </div>' +
                    '</li>';
            }
        }
        document.getElementById('ulList').innerHTML = ulListStr;
        document.getElementById("RichTextEditor").innerHTML = document.getElementById(openWhereDEExtKey + 'WhereClauseValue').innerHTML;
        document.getElementById('SecondModal').style.display = 'block';
    }
    function OpenSelectField(EleDEExtKey) {
        document.getElementById('leftsideListInSelectField').innerHTML = '';
        document.getElementById('rightsideListInSelectField').innerHTML = '';
        document.getElementById('RelationPopup').style.display = 'block';
        EleDEExtKey = EleDEExtKey.split("OpenSelectField");
        EleDEExtKey = EleDEExtKey[0];
        openSelectFieldsDEExtKey = EleDEExtKey;
        //priyanka added code----------------
        var bool;
        if (openSelectFieldsDEExtKey in DEListMap.DEMap) {
            for (var key in DEListMap.DEMap[openSelectFieldsDEExtKey].DEFields) {
                for (var key1 in DEListMap.DEMap[openSelectFieldsDEExtKey].DESelectedFields) {
                    if (DEListMap.DEMap[openSelectFieldsDEExtKey].DESelectedFields[key1]["FieldName"] == DEListMap.DEMap[openSelectFieldsDEExtKey].DEFields[key]["FieldName"]) {
                        bool = true;
                        break;
                    } else {
                        bool = false;
                    }
                }
                if (bool == true) {
                    document.getElementById('rightsideListInSelectField').innerHTML += ' <option value="' + DEListMap.DEMap[openSelectFieldsDEExtKey].DEFields[key].FieldType +
                        '" id="' + DEDragData.DEExtKey + '" draggable=true name="' + DEListMap.DEMap[openSelectFieldsDEExtKey].DEFields[key].FieldName +
                        '" label="' + DEListMap.DEMap[openSelectFieldsDEExtKey].DEFields[key].FieldName + '" style="padding:4%; margin:0;"> ' + DEListMap.DEMap[openSelectFieldsDEExtKey].DEFields[key].FieldName + '</option><br>';
                } else {
                    document.getElementById('leftsideListInSelectField').innerHTML += ' <option value="' + DEListMap.DEMap[openSelectFieldsDEExtKey].DEFields[key].FieldType +
                        '" id="' + DEDragData.DEExtKey + '" draggable=true name="' + DEListMap.DEMap[openSelectFieldsDEExtKey].DEFields[key].FieldName +
                        '" label="' + DEListMap.DEMap[openSelectFieldsDEExtKey].DEFields[key].FieldName + '" style="padding:4%; margin:0;"> ' + DEListMap.DEMap[openSelectFieldsDEExtKey].DEFields[key].FieldName + '</option><br>';
                }
            }
            document.getElementById("modal-heading-01").innerHTML = DEListMap.DEMap[openSelectFieldsDEExtKey].DEName + " Data Extension Fields";
        } else if (openSelectFieldsDEExtKey in DEListMap.SharedDEMap) {
            for (var key in DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DEFields) {
                for (var key1 in DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DESelectedFields) {
                    if (DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DESelectedFields[key1]["FieldName"] == DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DEFields[key]["FieldName"]) {
                        bool = true;
                        break;
                    } else {
                        bool = false;
                    }
                }
                if (bool == true) {
                    document.getElementById('rightsideListInSelectField').innerHTML += ' <option value="' + DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DEFields[key].FieldType +
                        '" id="' + DEDragData.DEExtKey + '" draggable=true name="' + DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DEFields[key].FieldName +
                        '" label="' + DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DEFields[key].FieldName + '" style="padding:4%; margin:0;"> ' + DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DEFields[key].FieldName + '</option><br>';
                } else {
                    document.getElementById('leftsideListInSelectField').innerHTML += ' <option value="' + DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DEFields[key].FieldType +
                        '" id="' + DEDragData.DEExtKey + '" draggable=true name="' + DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DEFields[key].FieldName +
                        '" label="' + DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DEFields[key].FieldName + '" style="padding:4%; margin:0;"> ' + DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DEFields[key].FieldName + '</option><br>';
                }

            }
            document.getElementById("modal-heading-01").innerHTML = DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DEName + " Data Extension Fields";
        } else if (openSelectFieldsDEExtKey in DEListMap.DataViewMap) {
            for (var key in DEListMap.DataViewMap[openSelectFieldsDEExtKey].DEFields) {
                for (var key1 in DEListMap.DataViewMap[openSelectFieldsDEExtKey].DESelectedFields) {
                    if (DEListMap.DataViewMap[openSelectFieldsDEExtKey].DESelectedFields[key1]["FieldName"] == DEListMap.DataViewMap[openSelectFieldsDEExtKey].DEFields[key]["FieldName"]) {
                        bool = true;
                        break;
                    } else {
                        bool = false;
                    }
                }
                if (bool == true) {
                    document.getElementById('rightsideListInSelectField').innerHTML += ' <option value="' + DEListMap.DataViewMap[openSelectFieldsDEExtKey].DEFields[key].FieldType +
                        '" id="' + DEDragData.DEExtKey + '" draggable=true name="' + DEListMap.DataViewMap[openSelectFieldsDEExtKey].DEFields[key].FieldName +
                        '" label="' + DEListMap.DataViewMap[openSelectFieldsDEExtKey].DEFields[key].FieldName + '" style="padding:4%; margin:0;"> ' + DEListMap.DataViewMap[openSelectFieldsDEExtKey].DEFields[key].FieldName + '</option><br>';
                } else {
                    document.getElementById('leftsideListInSelectField').innerHTML += ' <option value="' + DEListMap.DataViewMap[openSelectFieldsDEExtKey].DEFields[key].FieldType +
                        '" id="' + DEDragData.DEExtKey + '" draggable=true name="' + DEListMap.DataViewMap[openSelectFieldsDEExtKey].DEFields[key].FieldName +
                        '" label="' + DEListMap.DataViewMap[openSelectFieldsDEExtKey].DEFields[key].FieldName + '" style="padding:4%; margin:0;"> ' + DEListMap.DataViewMap[openSelectFieldsDEExtKey].DEFields[key].FieldName + '</option><br>';
                }
            }
            document.getElementById("modal-heading-01").innerHTML = DEListMap.DataViewMap[openSelectFieldsDEExtKey].DEName + " Data Extension Fields";
        }
        document.getElementById("modal-heading-01").innerHTML = DEListMap.DEMap[openSelectFieldsDEExtKey].DEName + " Data Extension Fields";
        document.getElementById('leftsideListInSelectField').innerHTML = html;
    }
    function DetailsSave() {
        document.getElementById('RelationPopup').style.display = 'none';
        document.getElementById('SecondModal').style.display = 'none';
        if (DEDragData.DEExtKey != '') {
            var fieldsListForRelationDiv = '';
            DESetQueryBox.add(DEDragData.DEExtKey);
            if (DEDragData.DEExtKey in DEListMap.DEMap) {
                DEListMap.DEMap[DEDragData.DEExtKey].DESelectedFields = [];
                for (var SelectedField of document.getElementById("rightsideListInSelectField").querySelectorAll("option")) {
                    DEListMap.DEMap[DEDragData.DEExtKey].DESelectedFields.push({
                        "FieldName": SelectedField.label,
                        "FieldType": SelectedField.value
                    });
                    fieldsListForRelationDiv += '<li class="data-box-style" title="' + SelectedField.label + '" data-id="e63e3ebe-a7c5-ea11-a2ec-48df37342369"><span>' + SelectedField.label + '</span></li>';
                }
            } else if (DEDragData.DEExtKey in DEListMap.SharedDEMap) {
                DEListMap.SharedDEMap[DEDragData.DEExtKey].DESelectedFields = [];
                for (var SelectedField of document.getElementById("rightsideListInSelectField").querySelectorAll("option")) {
                    DEListMap.SharedDEMap[DEDragData.DEExtKey].DESelectedFields.push({
                        "FieldName": SelectedField.label,
                        "FieldType": SelectedField.value
                    });
                    fieldsListForRelationDiv += '<li class="data-box-style" title="' + SelectedField.label + '" data-id="e63e3ebe-a7c5-ea11-a2ec-48df37342369"><span>' + SelectedField.label + '</span></li>';
                }
            } else if (DEDragData.DEExtKey in DEListMap.DataViewMap) {
                DEListMap.DataViewMap[DEDragData.DEExtKey].DESelectedFields = [];
                for (var SelectedField of document.getElementById("rightsideListInSelectField").querySelectorAll("option")) {
                    DEListMap.DataViewMap[DEDragData.DEExtKey].DESelectedFields.push({
                        "FieldName": SelectedField.label,
                        "FieldType": SelectedField.value
                    });
                    fieldsListForRelationDiv += '<li class="data-box-style" title="' + SelectedField.label + '" data-id="e63e3ebe-a7c5-ea11-a2ec-48df37342369"><span>' + SelectedField.label + '</span></li>';
                }
            }
            //************************************************Edited By ANIL KUMAR**********************************//
            var mydivStyle = "top:" + ((document.getElementsByClassName("mydiv").length * 15) + 40) + "px;" + "left:" + ((document.getElementsByClassName("mydiv").length * 15) + 40) + "px;";
            var relationDivString = '<style>' +
                '        ' +
                '        .mainQuaryBoxStyle{' +
                '            width:10em;' +
                '            background-color: #353535;' +
                '            border-color:#353535;' +
                '            position: absolute;' +
                '            -webkit-user-select: none;' +
                '            -khtml-user-select: none;' +
                '            -moz-user-select: none;' +
                '            -ms-user-select: none;' +
                '            -o-user-select: none;' +
                '            user-select: none;' +
                '            user-select: none;' +
                '            -webkit-touch-callout: none;' +
                '            opacity:0.9;' +
                '            ' +
                '        }' +
                '' +
                '        .headerOfQuaryBox' +
                '        {' +
                '            text-align: left;' +
                '            font-size:75%;' +
                '            border-bottom: 0;' +
                '            margin:auto;' +
                '            color:white;' +
                '            font-weight:bold;' +
                '            font-family: Calibr;' +
                '            padding:2%;' +
                '        }' +
                '        .data-query-Box-style{' +
                '            margin:1px;' +
                '            background-color: #F1F1F1;' +
                '            padding:0;' +
                '            font-size: 70%;' +
                '            max-height:250px;' +
                '        }' +
                '        .data-box-style{' +
                '            color:#686363;' +
                '            font-size: 80%;' +
                '            cursor: pointer;' +
                '            border-bottom: 1px solid #ddc5c5;' +
                '            font-family: Calibr;' +
                '            padding:2%;' +
                '        }' +
                '' +
                '        .quaryBox{' +
                '          color:#686363;  ' +
                '          text-align:center;' +
                '          max-height:150px;' +
                '          margin:0px;' +
                '          background-color: #F1F1F1;' +
                '          padding:0;' +
                '          font-size: 70%;' +
                '          ' +
                '        }' +
                '' +
                '        .dataFields-area-set{' +
                '            padding-left: 0;' +
                '            ' +
                '        }    ' +
                '' +
                '        .buttonStyle{' +
                '            background-color: transparent;' +
                '            height:24px;' +
                '            width:24px;' +
                '            float: right;' +
                '            border:none;' +
                '        }' +
                '       .mainQuaryBoxStyle:active{' +
                '            width:10em;' +
                '            background-color: #387F9D;' +
                '            border-color:#387F9D;' +
                '            position: absolute;' +
                '            -webkit-user-select: none;' +
                '            -khtml-user-select: none;' +
                '            -moz-user-select: none;' +
                '            -ms-user-select: none;' +
                '            -o-user-select: none;' +
                '            user-select: none;' +
                '            user-select: none;' +
                '            -webkit-touch-callout: none;' +
                '            opacity:0.9;' +
                '          }' +
                '         .headerOfQuaryBox:hover' +
                '         {' +
                '           cursor: move;' +
                '          }' +
                ' </style>' +
                '<div style="position:relative;" class="myRefreshClass" onmouseup="changingColorOfLine()" onmousedown="schemaActionMyDiv(this.id)" id="' + DEDragData.DEExtKey + '##">' +
                '<div style="' + mydivStyle + '" class="slds-card mainQuaryBoxStyle mydiv box1" id="' + DEDragData.DEExtKey + '#ForConnectedLine">' +
                '    <div class="headerOfQuaryBox" data-original-title="" title="">' +
                '        <table>' +
                '            <tbody>' +
                '                <th>' +
                '                    <td style="width:8em;" ><span style="display: inline-block;width: 100px;white-space: nowrap;overflow: hidden !important;text-overflow: ellipsis;" title="">' + DEDragData.DEName + '</span></td>' +
                '                    <td width="20%">' +
                '                        <button class="buttonStyle" id="' + DEDragData.DEExtKey + '" onclick="deleteDiv(this.id)" >' +
                '                       <span class="slds-icon_container slds-icon-utility-close"' +
                '                        title="Description of icon when needed">' +
                '                        <svg width="18" height="18" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 18 18" class="slds-icon slds-icon-text-default"' +
                '                          aria-hidden="true">' +
                '                          <use' +
                '                            xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close">' +
                '                          </use>' +
                '' +
                '                        </svg>' +
                '                        <span class="slds-assistive-text">Description of icon when needed</span>' +
                '                      </span>' +
                '                        </button>' +
                '                    </td>' +
                '                    <td width="20%">' +
                '                        <button class="buttonStyle" id="' + DEDragData.DEExtKey + '" onclick="joinTwoDiv(this.id)">' +
                '                     <span class="slds-icon_container slds-icon-utility-add"' +
                '                        title="Description of icon when needed">' +
                '                        <svg width="18" height="18" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 18 18" class="slds-icon slds-icon-text-default"' +
                '                          aria-hidden="true">' +
                '                          <use' +
                '                            xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#add">' +
                '                          </use>' +
                '' +
                '                        </svg>' +
                '                        <span class="slds-assistive-text">Description of icon when needed</span>' +
                '                      </span>' +
                '                              ' +
                '                        </button>' +
                '                    </td>' +
                '                </th>' +
                '            </tbody>' +
                '        </table>' +
                '    </div>' +
                '   <div class="slds-card__body" style="margin-top: 0px;margin-bottom: 0px;">' +

                '   <div class="data-query-Box-style slds-box slds-scrollable" onclick="OpenSelectField(this.id)" id="' + DEDragData.DEExtKey + 'OpenSelectField">' +
                '  <ul style="padding-left: 0;">';
            relationDivString += fieldsListForRelationDiv;
            relationDivString += '</ul>' +
                '    </div>' +
                '    <div style="padding: 0px;" onclick="OpenWhere(this.id)" id="' + DEDragData.DEExtKey + 'OpenWhere" class="headerOfQuaryBox" data-original-title="" title="">' +
                '        <div style="text-align:center;">' +
                '            <span title="">Where</span>    ' +
                '        </div>' +
                '        <div class="slds-scrollable_y slds-box quaryBox">' +
                '            <p class="slds-align_absolute-center" style="cursor: pointer;" title="Where Clouse Condition" data-id="ee3e3ebe-a7c5-ea11-a2ec-48df37342369" id="' + DEDragData.DEExtKey + 'WhereClauseValue">' + document.getElementById("RichTextEditor").innerHTML + '</p>' +
                '            </div>' +
                '         </div>' +
                '   </div>' +
                '</div>' +
                '</div>';
            //************************************************FINISH(ANIL KUMAR)**********************************//
            document.getElementById("RelationshipDiv").innerHTML += relationDivString;
            if (document.getElementsByClassName("mydiv")) {
                for (var classEle in document.getElementsByClassName("mydiv")) {
                    dragElement(document.getElementsByClassName("mydiv")[classEle]);
                }
            }
        }
        if (openSelectFieldsDEExtKey != '') {
            //---------------------priyanka code-----------
            if (openSelectFieldsDEExtKey in DEListMap.DEMap) {
                DEListMap.DEMap[openSelectFieldsDEExtKey].DESelectedFields = [];
                for (var SelectedField of document.getElementById("rightsideListInSelectField").querySelectorAll("option")) {
                    DEListMap.DEMap[openSelectFieldsDEExtKey].DESelectedFields.push({
                        "FieldName": SelectedField.label,
                        "FieldType": SelectedField.value
                    });
                }
            } else if (openSelectFieldsDEExtKey in DEListMap.SharedDEMap) {
                DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DESelectedFields = [];
                for (var SelectedField of document.getElementById("rightsideListInSelectField").querySelectorAll("option")) {
                    DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DESelectedFields.push({
                        "FieldName": SelectedField.label,
                        "FieldType": SelectedField.value
                    });
                }
            } else if (openSelectFieldsDEExtKey in DEListMap.DataViewMap) {
                DEListMap.DataViewMap[openSelectFieldsDEExtKey].DESelectedFields = [];
                for (var SelectedField of document.getElementById("rightsideListInSelectField").querySelectorAll("option")) {
                    DEListMap.DataViewMap[openSelectFieldsDEExtKey].DESelectedFields.push({
                        "FieldName": SelectedField.label,
                        "FieldType": SelectedField.value
                    });
                }
            }
            fieldsListForRelationDiv = '';
            if (openSelectFieldsDEExtKey in DEListMap.DEMap) {
                for (var key in DEListMap.DEMap[openSelectFieldsDEExtKey].DESelectedFields) {
                    fieldsListForRelationDiv += '<li  class="data-box-style" title="' + DEListMap.DEMap[openSelectFieldsDEExtKey].DESelectedFields[key]["FieldName"] + '" data-id="' + openSelectFieldsDEExtKey + '"><span>' + DEListMap.DEMap[openSelectFieldsDEExtKey].DESelectedFields[key]["FieldName"] + '</span></li>';
                }
            } else if (openSelectFieldsDEExtKey in DEListMap.SharedDEMap) {
                for (var key in DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DESelectedFields) {
                    fieldsListForRelationDiv += '<li  class="data-box-style" title="' + DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DESelectedFields[key]["FieldName"] + '" data-id="' + openSelectFieldsDEExtKey + '"><span>' + DEListMap.SharedDEMap[openSelectFieldsDEExtKey].DESelectedFields[key]["FieldName"] + '</span></li>';
                }
            } else if (openSelectFieldsDEExtKey in DEListMap.DataViewMap) {
                for (var key in DEListMap.DataViewMap[openSelectFieldsDEExtKey].DESelectedFields) {
                    fieldsListForRelationDiv += '<li  class="data-box-style" title="' + DEListMap.DataViewMap[openSelectFieldsDEExtKey].DESelectedFields[key]["FieldName"] + '" data-id="' + openSelectFieldsDEExtKey + '"><span>' + DEListMap.DataViewMap[openSelectFieldsDEExtKey].DESelectedFields[key]["FieldName"] + '</span></li>';
                }
            }
            document.getElementById(openSelectFieldsDEExtKey + 'OpenSelectField').innerHTML = '<ul style="padding-left: 0;" class="slds-scrollable">' + fieldsListForRelationDiv + '</ul>';
        }
        //---------------ends here----------------------
        if (openWhereDEExtKey != '') {
            if (DESetQueryBox.has(openWhereDEExtKey)) {
                document.getElementById(openWhereDEExtKey + 'WhereClauseValue').innerHTML = document.getElementById("RichTextEditor").innerHTML;
            }
        }
        DEDragData = {
            "DEName": '',
            "DEExtKey": '',
            "DECategory": ''
        }
        openWhereDEExtKey = '';
        openSelectFieldsDEExtKey = '';
        document.getElementById('rightsideListInSelectField').innerHTML = '';
        document.getElementById("RichTextEditor").innerHTML = '';
        function dragElement(elmnt) {
            var main_Div = document.getElementById("");
            var pos1 = 0,
                pos2 = 0,
                pos3 = 0,
                pos4 = 0;
            if (document.getElementById(elmnt.id + "header")) {
                /* if present, the header is where you move the DIV from:*/
                document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
            } else {
                /* otherwise, move the DIV from anywhere inside the DIV:*/
                elmnt.onmousedown = dragMouseDown;
            }
            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
                //Added by ANIL KUMAR
                changeSchmaPosition(elmnt)
                schemaAction(elmnt);
            }
            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                //Added by ANIL KUMAR
                changeSchmaPosition(elmnt)
                schemaAction(elmnt);
            }
            function closeDragElement() {
                /* stop moving when mouse button is released:*/
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    }
    //--code by nitik
    //Added by ANIL KUMAR for restricting left dragging and top dragging(out from query div)  
    function changeSchmaPosition(e) {
        if (e.offsetLeft < 0) {
            e.style.left = 0 + "px";
        } else if (e.offsetTop < 0) {
            e.style.top = 0 + "px";
        }

    }
    //Anil kumar for creating Line
    var dragId = '';
    function schemaAction(elmnt) {
        var myDivId = (elmnt.id).split('#');
        for (var ConnectedTwoDiv of JoinQueryDetails.DEForJoin) {
            if (myDivId[0] == ConnectedTwoDiv.FirstDEExtKey) {
                joinQueryBoxLine(myDivId[0], ConnectedTwoDiv.SecondDEExtKey, ConnectedTwoDiv.JoinedLineDivId, "#387F9D");
            } else if (myDivId[0] == ConnectedTwoDiv.SecondDEExtKey) {
                joinQueryBoxLine(ConnectedTwoDiv.FirstDEExtKey, myDivId[0], ConnectedTwoDiv.JoinedLineDivId, "#387F9D");
            }
        }
    }
    function schemaActionMyDiv(id) {
        if (id) {
            var str = id.substring(0, id.length - 2);
            dragId = str;
        }
    }
    function changingColorOfLine() {
        for (var ConnectedTwoDiv of JoinQueryDetails.DEForJoin) {
            if (dragId == ConnectedTwoDiv.FirstDEExtKey) {
                joinQueryBoxLine(dragId, ConnectedTwoDiv.SecondDEExtKey, ConnectedTwoDiv.JoinedLineDivId, "#353535");
            } else if (dragId == ConnectedTwoDiv.SecondDEExtKey) {
                joinQueryBoxLine(ConnectedTwoDiv.FirstDEExtKey, dragId, ConnectedTwoDiv.JoinedLineDivId, '#353535');
            }
        }
    }
    //**************************************************END***************************************************** 
    function joinTwoDiv(FirstDEExtKeyForJoin) {
        var SecondDEExtKeyForJoinGlobal;
        var SecondJoinedDeSet = new Set();
        for (var key in JoinQueryDetails.DEForJoin) {
            if (JoinQueryDetails.DEForJoin[key].SecondDEExtKey == FirstDEExtKeyForJoin) {
                SecondJoinedDeSet.add(JoinQueryDetails.DEForJoin[key].FirstDEExtKey)
            }
        }
        FirstDEExtKeyForJoinGlobal = FirstDEExtKeyForJoin;
        var joinTwoDivString = '';
        if (joinedDivSet.has(FirstDEExtKeyForJoinGlobal)) {
            for (var key in JoinQueryDetails.DEForJoin) {
                if (FirstDEExtKeyForJoinGlobal in DEListMap.DEMap && (JoinQueryDetails.DEForJoin[key].FirstDEExtKey == FirstDEExtKeyForJoinGlobal)) {
                    SecondDEExtKeyForJoinGlobal = JoinQueryDetails.DEForJoin[key].SecondDEExtKey
                    joinTwoDivString = '<section role="dialog" tabindex="-1" aria-labelledby="modal-heading-01" aria-modal="true" aria-describedby="modal-content-id-1" class="slds-modal slds-fade-in-open">' +
                        '<div class="slds-modal__container">' +
                        '<header class="slds-modal__header" style="margin:0; padding:0; background-color: #e9f0f4; ">' +
                        '<button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close" onclick="CancelThirdModal()" style=" position: sticky; margin-left: 94%;">' +
                        '<svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                        '</svg>' +
                        '<span class="slds-assistive-text">Close</span>' +
                        '</button>' +
                        ' <h3 id="modal-heading-03"  style="padding:0; margin:0; margin-top: -25px; margin-bottom: 7px; font-size: 15px; color: #4e8abe; text-align: left; margin-left: 2.1%;" id="DEnamemodal1">Data Extension Fields</h3>' +
                        '</header>' +
                        ' <div  id="errorBlockOfJoinModalWindow" style="display:none; background: white;">' +
                        '<div class="slds-notify slds-notify_alert slds-alert_warning" role="alert" style=" background-color: #c23934;width: 100%; height: 5vh;padding-top: 0%; border-radius: 0.25rem; justify-content: left;align-items: self-start;">' +
                        ' <span class="slds-assistive-text">warning</span>' +
                        '<span class="slds-icon_container slds-icon-utility-warning slds-m-right_x-small" title="Description of icon when needed" style="float: left; margin-left: 2%; margin-top: 1.3%;">' +
                        ' <svg class="slds-icon slds-icon_x-small" aria-hidden="true">' +
                        ' <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>' +
                        '</svg>' +
                        '</span>' +
                        '<p style="padding: 0; float: left; margin-top: 1%;">Please select all the fields below. </p>' +
                        '<div class="slds-notify__close">' +
                        '<button class="slds-button slds-button_icon slds-button_icon-small" title="Close" onclick="CancelErrorBlockOfJoinModalWindow()">' +
                        ' <svg class="slds-button__icon" aria-hidden="true" style="fill:white;">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                        '</svg>' +
                        ' <span class="slds-assistive-text">Close</span>' +
                        '</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1">' +
                        '<div >' +
                        '<img id="joinImageDiv" src="Left Outer Join.JPG" alt="Joins" width="200" height="140" style="display: block;margin-left: auto;margin-right: auto;">' +
                        '</div>' +
                        '<div class="slds-grid slds-wrap">' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="text-input-id-1">First DE</label>' +
                        '<input style="width: 180px;" type="text" id="text-input-id-1" value="' + JoinQueryDetails.DEForJoin[key].FirstDEName + '" disabled="" class="slds-input" />' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="select-01">Join Type</label>' +
                        '<select onchange="selectJoinChange()" class="slds-select" style="width: 180px;" id="select-01">' +
                        '<option value="Left Outer Join">Left Outer Join</option>' +
                        '<option value="Left Outer Join with Exclusion">Left Outer Join with Exclusion</option>' +
                        '<option value="Right Outer Join">Right Outer Join</option>' +
                        '<option value="Right Outer Join with Exclusion">Right Outer Join with Exclusion</option>' +
                        '<option value="Inner Join">Inner Join</option>' +
                        '<option value="Full Outer Join">Full Outer Join</option>' +
                        '<option value="Outer Join">Outer Join</option>' +
                        '</select>' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="select-02">Second DE</label>' +
                        '<select onchange="SecondDEChange()" class="slds-select" style="width: 180px;" id="select-02">' +
                        '<option value="">Select..</option>';
                    for (var DEExtKeyLoop of Array.from(DESetQueryBox)) {
                        if (FirstDEExtKeyForJoinGlobal != DEExtKeyLoop) {
                            if (DEExtKeyLoop in DEListMap.DEMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DEMap[DEExtKeyLoop].DEName + '</option>';
                            }
                            if (DEExtKeyLoop in DEListMap.SharedDEMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.SharedDEMap[DEExtKeyLoop].DEName + '</option>';
                            }
                            if (DEExtKeyLoop in DEListMap.DataViewMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DataViewMap[DEExtKeyLoop].DEName + '</option>';
                            }
                        }
                    }
                    joinTwoDivString += '</select>' +
                        '</div>' +
                        '</div>' +
                        '<div class="slds-grid slds-wrap">' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 17%;">' +
                        '<label class="slds-form-element__label" for="FirstDEField">First DE Field For Join</label>' +
                        '<select class="slds-select" style="width: 180px;" id="FirstDEField">' +
                        '<option value="">Select..</option>';
                    for (var i in DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields) {
                        joinTwoDivString += '<option value="' + DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '">' + DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '</option>';
                    }
                    joinTwoDivString += '</select>' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 0%;">' +
                        '<label class="slds-form-element__label" for="SecondDEField">Second DE Field For Join</label>' +
                        '<select class="slds-select" style="width: 180px;" id="SecondDEField">' +
                        '<option value="">Select…</option>' +
                        '</select>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<footer class="slds-modal__footer" style="background:linear-gradient(#edf5fa,#fff); border-top:1px solid #eee; border-radius:0 0 5px 5px; background-repeat:repeat-x;">' +
                        '<button class="slds-button slds-button_neutral slds-float_left" style="font-size:11px; line-height:20px; color:#4e8abe; float:left!important;" onclick="CancelThirdModal()">Cancel</button>' +
                        '<button class="slds-button slds-button_brand" style="font-size:11px; line-height:20px; color:#edf5fa; float:right!important;" onclick="SaveJoinQuery()" id="SaveButton">Save</button>' +
                        '</footer>' +
                        '</div>' +
                        '</section>' +
                        '<div class="slds-backdrop slds-backdrop_open"></div>';
                } else if ((FirstDEExtKeyForJoinGlobal in DEListMap.DEMap) && (JoinQueryDetails.DEForJoin[key].SecondDEExtKey == FirstDEExtKeyForJoinGlobal)) {
                    joinTwoDivString = '<section role="dialog" tabindex="-1" aria-labelledby="modal-heading-01" aria-modal="true" aria-describedby="modal-content-id-1" class="slds-modal slds-fade-in-open">' +
                        '<div class="slds-modal__container">' +
                        '<header class="slds-modal__header" style="margin:0; padding:0; background-color: #e9f0f4; ">' +
                        '<button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close" onclick="CancelThirdModal()" style=" position: sticky; margin-left: 94%;">' +
                        ' <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                        '</svg>' +
                        '<span class="slds-assistive-text">Close</span>' +
                        '</button>' +
                        ' <h3 id="modal-heading-03"  style="padding:0; margin:0; margin-top: -25px; margin-bottom: 7px; font-size: 15px; color: #4e8abe; text-align: left; margin-left: 2.1%;" id="DEnamemodal1">Data Extension Fields</h3>' +
                        '</header>' +
                        ' <div  id="errorBlockOfJoinModalWindow" style="display:none; background: white;">' +
                        '<div class="slds-notify slds-notify_alert slds-alert_warning" role="alert" style=" background-color: #c23934;width: 100%; height: 5vh;padding-top: 0%; border-radius: 0.25rem; justify-content: left;align-items: self-start;">' +
                        '<span class="slds-assistive-text">warning</span>' +
                        '<span class="slds-icon_container slds-icon-utility-warning slds-m-right_x-small" title="Description of icon when needed" style="float: left; margin-left: 2%; margin-top: 1.3%;">' +
                        ' <svg class="slds-icon slds-icon_x-small" aria-hidden="true">' +
                        ' <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>' +
                        '</svg>' +
                        '</span>' +
                        '<p style="padding: 0; float: left; margin-top: 1%;">Please select all the fields below. </p>' +
                        '<div class="slds-notify__close">' +
                        '<button class="slds-button slds-button_icon slds-button_icon-small" title="Close" onclick="CancelErrorBlockOfJoinModalWindow()">' +
                        ' <svg class="slds-button__icon" aria-hidden="true" style="fill:white;">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                        '</svg>' +
                        ' <span class="slds-assistive-text">Close</span>' +
                        '</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1">' +
                        '<div >' +
                        '<img id="joinImageDiv" src="Left Outer Join.JPG" alt="Joins" width="200" height="140" style="display: block;margin-left: auto;margin-right: auto;">' +
                        '</div>' +
                        '<div class="slds-grid slds-wrap">' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="text-input-id-1">First DE</label>' +
                        '<input style="width: 180px;" type="text" id="text-input-id-1" value="' + JoinQueryDetails.DEForJoin[key].SecondDEName + '" disabled="" class="slds-input" />' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="select-01">Join Type</label>' +
                        '<select onchange="selectJoinChange()" class="slds-select" style="width: 180px;" id="select-01">' +
                        '<option value="Left Outer Join">Left Outer Join</option>' +
                        '<option value="Left Outer Join with Exclusion">Left Outer Join with Exclusion</option>' +
                        '<option value="Right Outer Join">Right Outer Join</option>' +
                        '<option value="Right Outer Join with Exclusion">Right Outer Join with Exclusion</option>' +
                        '<option value="Inner Join">Inner Join</option>' +
                        '<option value="Full Outer Join">Full Outer Join</option>' +
                        '<option value="Outer Join">Outer Join</option>' +
                        '</select>' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="select-02">Second DE</label>' +
                        '<select onchange="SecondDEChange()" class="slds-select" style="width: 180px;" id="select-02">' +
                        '<option value="">Select..</option>';
                    for (var DEExtKeyLoop of Array.from(DESetQueryBox)) {
                        if (SecondJoinedDeSet.has(DEExtKeyLoop)) {
                        } else if (FirstDEExtKeyForJoinGlobal != DEExtKeyLoop) {
                            if (DEExtKeyLoop in DEListMap.DEMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DEMap[DEExtKeyLoop].DEName + '</option>';
                            }
                            if (DEExtKeyLoop in DEListMap.SharedDEMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.SharedDEMap[DEExtKeyLoop].DEName + '</option>';
                            }
                            if (DEExtKeyLoop in DEListMap.DataViewMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DataViewMap[DEExtKeyLoop].DEName + '</option>';
                            }
                        }
                    }
                    joinTwoDivString += '</select>' +
                        '</div>' +
                        '</div>' +
                        '<div class="slds-grid slds-wrap">' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 17%;">' +
                        '<label class="slds-form-element__label" for="FirstDEField">First DE Field For Join</label>' +
                        '<select class="slds-select" style="width: 180px;" id="FirstDEField">' +
                        '<option value="">Select..</option>';
                    for (var i in DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields) {
                        joinTwoDivString += '<option value="' + DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '">' + DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '</option>';
                    }
                    joinTwoDivString += '</select>' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 0%;">' +
                        '<label class="slds-form-element__label" for="SecondDEField">Second DE Field For Join</label>' +
                        '<select class="slds-select" style="width: 180px;" id="SecondDEField">' +
                        '<option value="">Select…</option>' +
                        '</select>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<footer class="slds-modal__footer" style="background:linear-gradient(#edf5fa,#fff); border-top:1px solid #eee; border-radius:0 0 5px 5px; background-repeat:repeat-x;">' +
                        '<button class="slds-button slds-button_neutral slds-float_left" style="font-size:11px; line-height:20px; color:#4e8abe; float:left!important;" onclick="CancelThirdModal()">Cancel</button>' +
                        '<button class="slds-button slds-button_brand" style="font-size:11px; line-height:20px; color:#edf5fa; float:right!important;" onclick="SaveJoinQuery()" id="SaveButton">Save</button>' +
                        '</footer>' +
                        '</div>' +
                        '</section>' +
                        '<div class="slds-backdrop slds-backdrop_open"></div>';
                    break;
                } else if ((FirstDEExtKeyForJoinGlobal in DEListMap.SharedDEMap) && (JoinQueryDetails.DEForJoin[key].FirstDEExtKey == FirstDEExtKeyForJoinGlobal)) {
                    SecondDEExtKeyForJoinGlobal = JoinQueryDetails.DEForJoin[key].SecondDEExtKey
                    joinTwoDivString = '<section role="dialog" tabindex="-1" aria-labelledby="modal-heading-01" aria-modal="true" aria-describedby="modal-content-id-1" class="slds-modal slds-fade-in-open">' +
                        '<div class="slds-modal__container">' +
                        '<header class="slds-modal__header" style="margin:0; padding:0; background-color: #e9f0f4; ">' +
                        '<button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close" onclick="CancelThirdModal()" style=" position: sticky; margin-left: 94%;">' +
                        ' <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                        '</svg>' +
                        '<span class="slds-assistive-text">Close</span>' +
                        '</button>' +
                        ' <h3 id="modal-heading-03"  style="padding:0; margin:0; margin-top: -25px; margin-bottom: 7px; font-size: 15px; color: #4e8abe; text-align: left; margin-left: 2.1%;" id="DEnamemodal1">Data Extension Fields</h3>' +
                        '</header>' +
                        ' <div  id="errorBlockOfJoinModalWindow" style="display:none; background: white;">' +
                        '<div class="slds-notify slds-notify_alert slds-alert_warning" role="alert" style=" background-color: #c23934;width: 100%; height: 5vh;padding-top: 0%; border-radius: 0.25rem; justify-content: left;align-items: self-start;">' +
                        '<span class="slds-assistive-text">warning</span>' +
                        '<span class="slds-icon_container slds-icon-utility-warning slds-m-right_x-small" title="Description of icon when needed" style="float: left; margin-left: 2%; margin-top: 1.3%;">' +
                        '<svg class="slds-icon slds-icon_x-small" aria-hidden="true">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>' +
                        '</svg>' +
                        '</span>' +
                        '<p style="padding: 0; float: left; margin-top: 1%;">Please select all the fields below. </p>' +
                        '<div class="slds-notify__close">' +
                        '<button class="slds-button slds-button_icon slds-button_icon-small" title="Close" onclick="CancelErrorBlockOfJoinModalWindow()">' +
                        ' <svg class="slds-button__icon" aria-hidden="true" style="fill:white;">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                        '</svg>' +
                        ' <span class="slds-assistive-text">Close</span>' +
                        '</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1">' +
                        '<div >' +
                        '<img id="joinImageDiv" src="Left Outer Join.JPG" alt="Joins" width="200" height="140" style="display: block;margin-left: auto;margin-right: auto;">' +
                        '</div>' +
                        '<div class="slds-grid slds-wrap">' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="text-input-id-1">First DE</label>' +
                        '<input style="width: 180px;" type="text" id="text-input-id-1" value="' + JoinQueryDetails.DEForJoin[key].FirstDEName + '" disabled="" class="slds-input" />' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="select-01">Join Type</label>' +
                        '<select onchange="selectJoinChange()" class="slds-select" style="width: 180px;" id="select-01">' +
                        '<option value="Left Outer Join">Left Outer Join</option>' +
                        '<option value="Left Outer Join with Exclusion">Left Outer Join with Exclusion</option>' +
                        '<option value="Right Outer Join">Right Outer Join</option>' +
                        '<option value="Right Outer Join with Exclusion">Right Outer Join with Exclusion</option>' +
                        '<option value="Inner Join">Inner Join</option>' +
                        '<option value="Full Outer Join">Full Outer Join</option>' +
                        '<option value="Outer Join">Outer Join</option>' +
                        '</select>' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="select-02">Second DE</label>' +
                        '<select onchange="SecondDEChange()" class="slds-select" style="width: 180px;" id="select-02">' +
                        '<option value="">Select..</option>';
                    for (var DEExtKeyLoop of Array.from(DESetQueryBox)) {
                        if (FirstDEExtKeyForJoinGlobal != DEExtKeyLoop) {
                            if (DEExtKeyLoop in DEListMap.DEMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DEMap[DEExtKeyLoop].DEName + '</option>';
                            }
                            if (DEExtKeyLoop in DEListMap.SharedDEMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.SharedDEMap[DEExtKeyLoop].DEName + '</option>';
                            }
                            if (DEExtKeyLoop in DEListMap.DataViewMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DataViewMap[DEExtKeyLoop].DEName + '</option>';



                            }
                        }
                    }
                    joinTwoDivString += '</select>' +
                        '</div>' +
                        '</div>' +
                        '<div class="slds-grid slds-wrap">' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 17%;">' +
                        '<label class="slds-form-element__label" for="FirstDEField">First DE Field For Join</label>' +
                        '<select class="slds-select" style="width: 180px;" id="FirstDEField">' +
                        '<option value="">Select..</option>';
                    for (var i in DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEFields) {
                        joinTwoDivString += '<option value="' + DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '">' + DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '</option>';
                    }
                    joinTwoDivString += '</select>' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 0%;">' +
                        '<label class="slds-form-element__label" for="SecondDEField">Second DE Field For Join</label>' +
                        '<select class="slds-select" style="width: 180px;" id="SecondDEField">' +
                        '<option value="">Select…</option>' +
                        '</select>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<footer class="slds-modal__footer" style="background:linear-gradient(#edf5fa,#fff); border-top:1px solid #eee; border-radius:0 0 5px 5px; background-repeat:repeat-x;">' +
                        '<button class="slds-button slds-button_neutral slds-float_left" style="font-size:11px; line-height:20px; color:#4e8abe; float:left!important;" onclick="CancelThirdModal()">Cancel</button>' +
                        '<button class="slds-button slds-button_brand" style="font-size:11px; line-height:20px; color:#edf5fa; float:right!important;" onclick="SaveJoinQuery()" id="SaveButton">Save</button>' +
                        '</footer>' +
                        '</div>' +
                        '</section>' +
                        '<div class="slds-backdrop slds-backdrop_open"></div>';
                    break;
                } else if ((FirstDEExtKeyForJoinGlobal in DEListMap.SharedDEMap) && (JoinQueryDetails.DEForJoin[key].SecondDEExtKey == FirstDEExtKeyForJoinGlobal)) {
                    joinTwoDivString = '<section role="dialog" tabindex="-1" aria-labelledby="modal-heading-01" aria-modal="true" aria-describedby="modal-content-id-1" class="slds-modal slds-fade-in-open">' +
                        '<div class="slds-modal__container">' +
                        '<header class="slds-modal__header" style="margin:0; padding:0; background-color: #e9f0f4; ">' +
                        '<button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close" onclick="CancelThirdModal()" style=" position: sticky; margin-left: 94%;">' +
                        '<svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                        '</svg>' +
                        '<span class="slds-assistive-text">Close</span>' +
                        '</button>' +
                        '<h3 id="modal-heading-03"  style="padding:0; margin:0; margin-top: -25px; margin-bottom: 7px; font-size: 15px; color: #4e8abe; text-align: left; margin-left: 2.1%;" id="DEnamemodal1">Data Extension Fields</h3>' +
                        '</header>' +
                        '<div  id="errorBlockOfJoinModalWindow" style="display:none; background: white;">' +
                        '<div class="slds-notify slds-notify_alert slds-alert_warning" role="alert" style=" background-color: #c23934;width: 100%; height: 5vh;padding-top: 0%; border-radius: 0.25rem; justify-content: left;align-items: self-start;">' +
                        '<span class="slds-assistive-text">warning</span>' +
                        '<span class="slds-icon_container slds-icon-utility-warning slds-m-right_x-small" title="Description of icon when needed" style="float: left; margin-left: 2%; margin-top: 1.3%;">' +
                        '<svg class="slds-icon slds-icon_x-small" aria-hidden="true">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>' +
                        '</svg>' +
                        '</span>' +
                        '<p style="padding: 0; float: left; margin-top: 1%;">Please select all the fields below. </p>' +
                        '<div class="slds-notify__close">' +
                        '<button class="slds-button slds-button_icon slds-button_icon-small" title="Close" onclick="CancelErrorBlockOfJoinModalWindow()">' +
                        '<svg class="slds-button__icon" aria-hidden="true" style="fill:white;">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                        '</svg>' +
                        '<span class="slds-assistive-text">Close</span>' +
                        '</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1">' +
                        '<div >' +
                        '<img id="joinImageDiv" src="Left Outer Join.JPG" alt="Joins" width="200" height="140" style="display: block;margin-left: auto;margin-right: auto;">' +
                        '</div>' +
                        '<div class="slds-grid slds-wrap">' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="text-input-id-1">First DE</label>' +
                        '<input style="width: 180px;" type="text" id="text-input-id-1" value="' + JoinQueryDetails.DEForJoin[key].SecondDEName + '" disabled="" class="slds-input" />' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="select-01">Join Type</label>' +
                        '<select onchange="selectJoinChange()" class="slds-select" style="width: 180px;" id="select-01">' +
                        '<option value="Left Outer Join">Left Outer Join</option>' +
                        '<option value="Left Outer Join with Exclusion">Left Outer Join with Exclusion</option>' +
                        '<option value="Right Outer Join">Right Outer Join</option>' +
                        '<option value="Right Outer Join with Exclusion">Right Outer Join with Exclusion</option>' +
                        '<option value="Inner Join">Inner Join</option>' +
                        '<option value="Full Outer Join">Full Outer Join</option>' +
                        '<option value="Outer Join">Outer Join</option>' +
                        '</select>' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="select-02">Second DE</label>' +
                        '<select onchange="SecondDEChange()" class="slds-select" style="width: 180px;" id="select-02">' +
                        '<option value="">Select..</option>';
                    for (var DEExtKeyLoop of Array.from(DESetQueryBox)) {
                        if (SecondJoinedDeSet.has(DEExtKeyLoop)) {
                        } else if (FirstDEExtKeyForJoinGlobal != DEExtKeyLoop) {
                            if (DEExtKeyLoop in DEListMap.DEMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DEMap[DEExtKeyLoop].DEName + '</option>';
                            }
                            if (DEExtKeyLoop in DEListMap.SharedDEMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.SharedDEMap[DEExtKeyLoop].DEName + '</option>';
                            }
                            if (DEExtKeyLoop in DEListMap.DataViewMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DataViewMap[DEExtKeyLoop].DEName + '</option>';
                            }
                        }
                    }
                    joinTwoDivString += '</select>' +
                        '</div>' +
                        '</div>' +
                        '<div class="slds-grid slds-wrap">' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 17%;">' +
                        '<label class="slds-form-element__label" for="FirstDEField">First DE Field For Join</label>' +
                        '<select class="slds-select" style="width: 180px;" id="FirstDEField">' +
                        '<option value="">Select..</option>';
                    for (var i in DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEFields) {
                        joinTwoDivString += '<option value="' + DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '">' + DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '</option>';
                    }
                    joinTwoDivString += '</select>' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 0%;">' +
                        '<label class="slds-form-element__label" for="SecondDEField">Second DE Field For Join</label>' +
                        '<select class="slds-select" style="width: 180px;" id="SecondDEField">' +
                        '<option value="">Select…</option>' +
                        '</select>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<footer class="slds-modal__footer" style="background:linear-gradient(#edf5fa,#fff); border-top:1px solid #eee; border-radius:0 0 5px 5px; background-repeat:repeat-x;">' +
                        '<button class="slds-button slds-button_neutral slds-float_left" style="font-size:11px; line-height:20px; color:#4e8abe; float:left!important;" onclick="CancelThirdModal()">Cancel</button>' +
                        '<button class="slds-button slds-button_brand" style="font-size:11px; line-height:20px; color:#edf5fa; float:right!important;" onclick="SaveJoinQuery()" id="SaveButton">Save</button>' +
                        '</footer>' +
                        '</div>' +
                        '</section>' +
                        '<div class="slds-backdrop slds-backdrop_open"></div>';
                    break;
                } else if ((FirstDEExtKeyForJoinGlobal in DEListMap.DataViewMap) && (JoinQueryDetails.DEForJoin[key].FirstDEExtKey == FirstDEExtKeyForJoinGlobal)) {
                    SecondDEExtKeyForJoinGlobal = JoinQueryDetails.DEForJoin[key].SecondDEExtKey
                    joinTwoDivString = '<section role="dialog" tabindex="-1" aria-labelledby="modal-heading-01" aria-modal="true" aria-describedby="modal-content-id-1" class="slds-modal slds-fade-in-open">' +
                        '<div class="slds-modal__container">' +
                        '<header class="slds-modal__header" style="margin:0; padding:0; background-color: #e9f0f4; ">' +
                        '<button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close" onclick="CancelThirdModal()" style=" position: sticky; margin-left: 94%;">' +
                        '<svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                        '</svg>' +
                        '<span class="slds-assistive-text">Close</span>' +
                        '</button>' +
                        '<h3 id="modal-heading-03"  style="padding:0; margin:0; margin-top: -25px; margin-bottom: 7px; font-size: 15px; color: #4e8abe; text-align: left; margin-left: 2.1%;" id="DEnamemodal1">Data Extension Fields</h3>' +
                        '</header>' +
                        '<div  id="errorBlockOfJoinModalWindow" style="display:none; background: white;">' +
                        '<div class="slds-notify slds-notify_alert slds-alert_warning" role="alert" style=" background-color: #c23934;width: 100%; height: 5vh;padding-top: 0%; border-radius: 0.25rem; justify-content: left;align-items: self-start;">' +
                        '<span class="slds-assistive-text">warning</span>' +
                        '<span class="slds-icon_container slds-icon-utility-warning slds-m-right_x-small" title="Description of icon when needed" style="float: left; margin-left: 2%; margin-top: 1.3%;">' +
                        ' <svg class="slds-icon slds-icon_x-small" aria-hidden="true">' +
                        ' <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>' +
                        '</svg>' +
                        '</span>' +
                        '<p style="padding: 0; float: left; margin-top: 1%;">Please select all the fields below.</p>' +
                        '<div class="slds-notify__close">' +
                        '<button class="slds-button slds-button_icon slds-button_icon-small" title="Close" onclick="CancelErrorBlockOfJoinModalWindow()">' +
                        '<svg class="slds-button__icon" aria-hidden="true" style="fill:white;">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                        '</svg>' +
                        '<span class="slds-assistive-text">Close</span>' +
                        '</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1">' +
                        '<div >' +
                        '<img id="joinImageDiv" src="Left Outer Join.JPG" alt="Joins" width="200" height="140" style="display: block;margin-left: auto;margin-right: auto;">' +
                        '</div>' +
                        '<div class="slds-grid slds-wrap">' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="text-input-id-1">First DE</label>' +
                        '<input style="width: 180px;" type="text" id="text-input-id-1" value="' + JoinQueryDetails.DEForJoin[key].FirstDEName + '" disabled="" class="slds-input" />' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="select-01">Join Type</label>' +
                        '<select onchange="selectJoinChange()" class="slds-select" style="width: 180px;" id="select-01">' +
                        '<option value="Left Outer Join">Left Outer Join</option>' +
                        '<option value="Left Outer Join with Exclusion">Left Outer Join with Exclusion</option>' +
                        '<option value="Right Outer Join">Right Outer Join</option>' +
                        '<option value="Right Outer Join with Exclusion">Right Outer Join with Exclusion</option>' +
                        '<option value="Inner Join">Inner Join</option>' +
                        '<option value="Full Outer Join">Full Outer Join</option>' +
                        '<option value="Outer Join">Outer Join</option>' +
                        '</select>' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="select-02">Second DE</label>' +
                        '<select onchange="SecondDEChange()" class="slds-select" style="width: 180px;" id="select-02">' +
                        '<option value="">Select..</option>';
                    for (var DEExtKeyLoop of Array.from(DESetQueryBox)) {
                        if (FirstDEExtKeyForJoinGlobal != DEExtKeyLoop) {
                            if (DEExtKeyLoop in DEListMap.DEMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DEMap[DEExtKeyLoop].DEName + '</option>';
                            }
                            if (DEExtKeyLoop in DEListMap.SharedDEMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.SharedDEMap[DEExtKeyLoop].DEName + '</option>';
                            }
                            if (DEExtKeyLoop in DEListMap.DataViewMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DataViewMap[DEExtKeyLoop].DEName + '</option>';
                            }
                        }
                    }
                    joinTwoDivString += '</select>' +
                        '</div>' +
                        '</div>' +
                        '<div class="slds-grid slds-wrap">' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 17%;">' +
                        '<label class="slds-form-element__label" for="FirstDEField">First DE Field For Join</label>' +
                        '<select class="slds-select" style="width: 180px;" id="FirstDEField">' +
                        '<option value="">Select</option>';
                    for (var i in DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEFields) {
                        joinTwoDivString += '<option value="' + DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '">' + DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '</option>';
                    }
                    joinTwoDivString += '</select>' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 0%;">' +
                        '<label class="slds-form-element__label" for="SecondDEField">Second DE Field For Join</label>' +
                        '<select class="slds-select" style="width: 180px;" id="SecondDEField">' +
                        '<option value="">Select…</option>' +
                        '</select>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<footer class="slds-modal__footer" style="background:linear-gradient(#edf5fa,#fff); border-top:1px solid #eee; border-radius:0 0 5px 5px; background-repeat:repeat-x;">' +
                        '<button class="slds-button slds-button_neutral slds-float_left" style="font-size:11px; line-height:20px; color:#4e8abe; float:left!important;" onclick="CancelThirdModal()">Cancel</button>' +
                        '<button class="slds-button slds-button_brand" style="font-size:11px; line-height:20px; color:#edf5fa; float:right!important;" onclick="SaveJoinQuery()" id="SaveButton">Save</button>' +
                        '</footer>' +
                        '</div>' +
                        '</section>' +
                        '<div class="slds-backdrop slds-backdrop_open"></div>';
                } else if ((FirstDEExtKeyForJoinGlobal in DEListMap.DataViewMap) && (JoinQueryDetails.DEForJoin[key].SecondDEExtKey == FirstDEExtKeyForJoinGlobal)) {
                    joinTwoDivString = '<section role="dialog" tabindex="-1" aria-labelledby="modal-heading-01" aria-modal="true" aria-describedby="modal-content-id-1" class="slds-modal slds-fade-in-open">' +
                        '<div class="slds-modal__container">' +
                        '<header class="slds-modal__header" style="margin:0; padding:0; background-color: #e9f0f4; ">' +
                        '<button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close" onclick="CancelThirdModal()" style=" position: sticky; margin-left: 94%;">' +
                        ' <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                        '</svg>' +
                        '<span class="slds-assistive-text">Close</span>' +
                        '</button>' +
                        ' <h3 id="modal-heading-03"  style="padding:0; margin:0; margin-top: -25px; margin-bottom: 7px; font-size: 15px; color: #4e8abe; text-align: left; margin-left: 2.1%;" id="DEnamemodal1">Data Extension Fields</h3>' +
                        '</header>' +
                        ' <div  id="errorBlockOfJoinModalWindow" style="display:none; background: white;">' +
                        '<div class="slds-notify slds-notify_alert slds-alert_warning" role="alert" style=" background-color: #c23934;width: 100%; height: 5vh;padding-top: 0%; border-radius: 0.25rem; justify-content: left;align-items: self-start;">' +
                        '<span class="slds-assistive-text">warning</span>' +
                        '<span class="slds-icon_container slds-icon-utility-warning slds-m-right_x-small" title="Description of icon when needed" style="float: left; margin-left: 2%; margin-top: 1.3%;">' +
                        '<svg class="slds-icon slds-icon_x-small" aria-hidden="true">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>' +
                        '</svg>' +
                        '</span>' +
                        '<p style="padding: 0; float: left; margin-top: 1%;">Please select all the fields below.</p>' +
                        '<div class="slds-notify__close">' +
                        '<button class="slds-button slds-button_icon slds-button_icon-small" title="Close" onclick="CancelErrorBlockOfJoinModalWindow()">' +
                        '<svg class="slds-button__icon" aria-hidden="true" style="fill:white;">' +
                        '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                        '</svg>' +
                        '<span class="slds-assistive-text">Close</span>' +
                        '</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1">' +
                        '<div >' +
                        '<img id="joinImageDiv" src="Left Outer Join.JPG" alt="Joins" width="200" height="140" style="display: block;margin-left: auto;margin-right: auto;">' +
                        '</div>' +
                        '<div class="slds-grid slds-wrap">' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="text-input-id-1">First DE</label>' +
                        '<input style="width: 180px;" type="text" id="text-input-id-1" value="' + JoinQueryDetails.DEForJoin[key].SecondDEName + '" disabled="" class="slds-input" />' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="select-01">Join Type</label>' +
                        '<select onchange="selectJoinChange()" class="slds-select" style="width: 180px;" id="select-01">' +
                        '<option value="Left Outer Join">Left Outer Join</option>' +
                        '<option value="Left Outer Join with Exclusion">Left Outer Join with Exclusion</option>' +
                        '<option value="Right Outer Join">Right Outer Join</option>' +
                        '<option value="Right Outer Join with Exclusion">Right Outer Join with Exclusion</option>' +
                        '<option value="Inner Join">Inner Join</option>' +
                        '<option value="Full Outer Join">Full Outer Join</option>' +
                        '<option value="Outer Join">Outer Join</option>' +
                        '</select>' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                        '<label class="slds-form-element__label" for="select-02">Second DE</label>' +
                        '<select onchange="SecondDEChange()" class="slds-select" style="width: 180px;" id="select-02">' +
                        '<option value="">Select..</option>';
                    for (var DEExtKeyLoop of Array.from(DESetQueryBox)) {
                        if (SecondJoinedDeSet.has(DEExtKeyLoop)) {
                        } else if (FirstDEExtKeyForJoinGlobal != DEExtKeyLoop) {
                            if (DEExtKeyLoop in DEListMap.DEMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DEMap[DEExtKeyLoop].DEName + '</option>';
                            }
                            if (DEExtKeyLoop in DEListMap.SharedDEMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.SharedDEMap[DEExtKeyLoop].DEName + '</option>';
                            }
                            if (DEExtKeyLoop in DEListMap.DataViewMap) {
                                joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DataViewMap[DEExtKeyLoop].DEName + '</option>';
                            }
                        }
                    }
                    joinTwoDivString += '</select>' +
                        '</div>' +
                        '</div>' +
                        '<div class="slds-grid slds-wrap">' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 17%;">' +
                        '<label class="slds-form-element__label" for="FirstDEField">First DE Field For Join</label>' +
                        '<select class="slds-select" style="width: 180px;" id="FirstDEField">' +
                        '<option value="">Select..</option>';
                    for (var i in DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEFields) {
                        joinTwoDivString += '<option value="' + DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '">' + DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '</option>';
                    }
                    joinTwoDivString += '</select>' +
                        '</div>' +
                        '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 0%;">' +
                        '<label class="slds-form-element__label" for="SecondDEField">Second DE Field For Join</label>' +
                        '<select class="slds-select" style="width: 180px;" id="SecondDEField">' +
                        '<option value="">Select…</option>' +
                        '</select>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<footer class="slds-modal__footer" style="background:linear-gradient(#edf5fa,#fff); border-top:1px solid #eee; border-radius:0 0 5px 5px; background-repeat:repeat-x;">' +
                        '<button class="slds-button slds-button_neutral slds-float_left" style="font-size:11px; line-height:20px; color:#4e8abe; float:left!important;" onclick="CancelThirdModal()">Cancel</button>' +
                        '<button class="slds-button slds-button_brand" style="font-size:11px; line-height:20px; color:#edf5fa; float:right!important;" onclick="SaveJoinQuery()" id="SaveButton">Save</button>' +
                        '</footer>' +
                        '</div>' +
                        '</section>' +
                        '<div class="slds-backdrop slds-backdrop_open"></div>';
                    break;
                }

            }
        } else if (joinedDivSet.size == 0) {
            //-----------nitik code started----------------------------------------
            if (FirstDEExtKeyForJoinGlobal in DEListMap.DEMap) {
                joinTwoDivString = '<section role="dialog" tabindex="-1" aria-labelledby="modal-heading-01" aria-modal="true" aria-describedby="modal-content-id-1" class="slds-modal slds-fade-in-open">' +
                    '<div class="slds-modal__container">' +
                    '<header class="slds-modal__header" style="margin:0; padding:0; background-color: #e9f0f4; ">' +
                    '<button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close" onclick="CancelThirdModal()" style=" position: sticky; margin-left: 94%;">' +
                    '<svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">' +
                    '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                    '</svg>' +
                    '<span class="slds-assistive-text">Close</span>' +
                    '</button>' +
                    ' <h3 id="modal-heading-03"  style="padding:0; margin:0; margin-top: -25px; margin-bottom: 7px; font-size: 15px; color: #4e8abe; text-align: left; margin-left: 2.1%;" id="DEnamemodal1">Data Extension Fields</h3>' +
                    '</header>' +
                    ' <div  id="errorBlockOfJoinModalWindow" style="display:none; background: white;">' +
                    '<div class="slds-notify slds-notify_alert slds-alert_warning" role="alert" style=" background-color: #c23934;width: 100%; height: 5vh;padding-top: 0%; border-radius: 0.25rem; justify-content: left;align-items: self-start;">' +
                    '<span class="slds-assistive-text">warning</span>' +
                    '<span class="slds-icon_container slds-icon-utility-warning slds-m-right_x-small" title="Description of icon when needed" style="float: left; margin-left: 2%; margin-top: 1.3%;">' +
                    '<svg class="slds-icon slds-icon_x-small" aria-hidden="true">' +
                    '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>' +
                    '</svg>' +
                    '</span>' +
                    '<p style="padding: 0; float: left; margin-top: 1%;">Please select all the fields below.</p>' +
                    '<div class="slds-notify__close">' +
                    '<button class="slds-button slds-button_icon slds-button_icon-small" title="Close" onclick="CancelErrorBlockOfJoinModalWindow()">' +
                    '<svg class="slds-button__icon" aria-hidden="true" style="fill:white;">' +
                    '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                    '</svg>' +
                    '<span class="slds-assistive-text">Close</span>' +
                    '</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1">' +
                    '<div >' +
                    '<img id="joinImageDiv" src="Left Outer Join.JPG" alt="Joins" width="200" height="140" style="display: block;margin-left: auto;margin-right: auto;">' +
                    '</div>' +
                    '<div class="slds-grid slds-wrap">' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                    '<label class="slds-form-element__label" for="text-input-id-1">First DE</label>' +
                    '<input style="width: 180px;" type="text" id="text-input-id-1" value="' + DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEName + '" disabled="" class="slds-input" />' +
                    '</div>' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                    '<label class="slds-form-element__label" for="select-01">Join Type</label>' +
                    '<select onchange="selectJoinChange()" class="slds-select" style="width: 180px;" id="select-01">' +
                    '<option value="Left Outer Join">Left Outer Join</option>' +
                    '<option value="Left Outer Join with Exclusion">Left Outer Join with Exclusion</option>' +
                    '<option value="Right Outer Join">Right Outer Join</option>' +
                    '<option value="Right Outer Join with Exclusion">Right Outer Join with Exclusion</option>' +
                    '<option value="Inner Join">Inner Join</option>' +
                    '<option value="Full Outer Join">Full Outer Join</option>' +
                    '<option value="Outer Join">Outer Join</option>' +
                    '</select>' +
                    '</div>' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                    '<label class="slds-form-element__label" for="select-02">Second DE</label>' +
                    '<select onchange="SecondDEChange()" class="slds-select" style="width: 180px;" id="select-02" >' +
                    '<option value="">Select…</option>';
                for (var DEExtKeyLoop of Array.from(DESetQueryBox)) {
                    if (FirstDEExtKeyForJoinGlobal != DEExtKeyLoop) {
                        if (DEExtKeyLoop in DEListMap.DEMap) {
                            joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DEMap[DEExtKeyLoop].DEName + '</option>';
                        } else if (DEExtKeyLoop in DEListMap.SharedDEMap) {
                            joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.SharedDEMap[DEExtKeyLoop].DEName + '</option>';
                        } else if (DEExtKeyLoop in DEListMap.DataViewMap) {
                            joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DataViewMap[DEExtKeyLoop].DEName + '</option>';
                        }
                    }
                }
                joinTwoDivString += '</select>' +
                    '</div>' +
                    '</div>' +
                    '<div class="slds-grid slds-wrap">' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 17%;">' +
                    '<label class="slds-form-element__label" for="FirstDEField">First DE Field For Join</label>' +
                    '<select class="slds-select" style="width: 180px;" id="FirstDEField">' +
                    '<option value="">Select…</option>';
                for (var i in DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields) {
                    joinTwoDivString += '<option value="' + DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '">' + DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '</option>';
                }
                joinTwoDivString += '</select>' +
                    '</div>' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 0%;">' +
                    '<label class="slds-form-element__label" for="SecondDEField">Second DE Field For Join</label>' +
                    '<select class="slds-select" style="width: 180px;" id="SecondDEField">' +
                    '<option value="">Select…</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<footer class="slds-modal__footer" style="background:linear-gradient(#edf5fa,#fff); border-top:1px solid #eee; border-radius:0 0 5px 5px; background-repeat:repeat-x;">' +
                    '<button class="slds-button slds-button_neutral slds-float_left" style="font-size:11px; line-height:20px; color:#4e8abe; float:left!important;" onclick="CancelThirdModal()">Cancel</button>' +
                    '<button class="slds-button slds-button_brand" style="font-size:11px; line-height:20px; color:#edf5fa; float:right!important;" onclick="SaveJoinQuery()">Save</button>' +
                    '</footer>' +
                    '</div>' +
                    '</section>' +
                    '<div class="slds-backdrop slds-backdrop_open"></div>';
            } else if (FirstDEExtKeyForJoinGlobal in DEListMap.SharedDEMap) {
                joinTwoDivString = '<section role="dialog" tabindex="-1" aria-labelledby="modal-heading-01" aria-modal="true" aria-describedby="modal-content-id-1" class="slds-modal slds-fade-in-open">' +
                    '<div class="slds-modal__container">' +
                    '<header class="slds-modal__header" style="margin:0; padding:0; background-color: #e9f0f4; ">' +
                    '<button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close" onclick="CancelThirdModal()" style=" position: sticky; margin-left: 94%;">' +
                    ' <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">' +
                    '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                    '</svg>' +
                    '<span class="slds-assistive-text">Close</span>' +
                    '</button>' +
                    ' <h3 id="modal-heading-03"  style="padding:0; margin:0; margin-top: -25px; margin-bottom: 7px; font-size: 15px; color: #4e8abe; text-align: left; margin-left: 2.1%;" id="DEnamemodal1">Data Extension Fields</h3>' +
                    '</header>' +
                    ' <div  id="errorBlockOfJoinModalWindow" style="display:none; background: white;">' +
                    '<div class="slds-notify slds-notify_alert slds-alert_warning" role="alert" style=" background-color: #c23934;width: 100%; height: 5vh;padding-top: 0%; border-radius: 0.25rem; justify-content: left;align-items: self-start;">' +
                    ' <span class="slds-assistive-text">warning</span>' +
                    '<span class="slds-icon_container slds-icon-utility-warning slds-m-right_x-small" title="Description of icon when needed" style="float: left; margin-left: 2%; margin-top: 1.3%;">' +
                    ' <svg class="slds-icon slds-icon_x-small" aria-hidden="true">' +
                    ' <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>' +
                    '</svg>' +
                    '</span>' +
                    '<p style="padding: 0; float: left; margin-top: 1%;">Please select all the fields below.</p>' +
                    '<div class="slds-notify__close">' +
                    '<button class="slds-button slds-button_icon slds-button_icon-small" title="Close" onclick="CancelErrorBlockOfJoinModalWindow()">' +
                    ' <svg class="slds-button__icon" aria-hidden="true" style="fill:white;">' +
                    '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                    '</svg>' +
                    ' <span class="slds-assistive-text">Close</span>' +
                    '</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1">' +
                    '<div >' +
                    '<img id="joinImageDiv" src="Left Outer Join.JPG" alt="Joins" width="200" height="140" style="display: block;margin-left: auto;margin-right: auto;">' +
                    '</div>' +
                    '<div class="slds-grid slds-wrap">' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                    '<label class="slds-form-element__label" for="text-input-id-1">First DE</label>' +
                    '<input style="width: 180px;" type="text" id="text-input-id-1" value="' + DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEName + '" disabled="" class="slds-input" />' +
                    '</div>' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                    '<label class="slds-form-element__label" for="select-01">Join Type</label>' +
                    '<select onchange="selectJoinChange()" class="slds-select" style="width: 180px;" id="select-01">' +
                    '<option value="Left Outer Join">Left Outer Join</option>' +
                    '<option value="Left Outer Join with Exclusion">Left Outer Join with Exclusion</option>' +
                    '<option value="Right Outer Join">Right Outer Join</option>' +
                    '<option value="Right Outer Join with Exclusion">Right Outer Join with Exclusion</option>' +
                    '<option value="Inner Join">Inner Join</option>' +
                    '<option value="Full Outer Join">Full Outer Join</option>' +
                    '<option value="Outer Join">Outer Join</option>' +
                    '</select>' +
                    '</div>' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                    '<label class="slds-form-element__label" for="select-02">Second DE</label>' +
                    '<select onchange="SecondDEChange()" class="slds-select" style="width: 180px;" id="select-02">' +
                    '<option value=" ">Select…</option>';
                for (var DEExtKeyLoop of Array.from(DESetQueryBox)) {
                    if (FirstDEExtKeyForJoinGlobal != DEExtKeyLoop) {
                        if (DEExtKeyLoop in DEListMap.DEMap) {
                            joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DEMap[DEExtKeyLoop].DEName + '</option>';
                        } else if (DEExtKeyLoop in DEListMap.SharedDEMap) {
                            joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.SharedDEMap[DEExtKeyLoop].DEName + '</option>';
                        } else if (DEExtKeyLoop in DEListMap.DataViewMap) {
                            joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DataViewMap[DEExtKeyLoop].DEName + '</option>';
                        }
                    }
                }
                joinTwoDivString += '</select>' +
                    '</div>' +
                    '</div>' +
                    '<div class="slds-grid slds-wrap">' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 17%;">' +
                    '<label class="slds-form-element__label" for="FirstDEField">First DE Field For Join</label>' +
                    '<select class="slds-select" style="width: 180px;" id="FirstDEField">' +
                    '<option value=" ">Select…</option>';
                for (var i in DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEFields) {
                    joinTwoDivString += '<option value="' + DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '">' + DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '</option>';
                }
                joinTwoDivString += '</select>' +
                    '</div>' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 0%;">' +
                    '<label class="slds-form-element__label" for="SecondDEField">Second DE Field For Join</label>' +
                    '<select class="slds-select" style="width: 180px;" id="SecondDEField" required>' +
                    '<option value=" ">Select…</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<footer class="slds-modal__footer" style="background:linear-gradient(#edf5fa,#fff); border-top:1px solid #eee; border-radius:0 0 5px 5px; background-repeat:repeat-x;">' +
                    '<button class="slds-button slds-button_neutral slds-float_left" style="font-size:11px; line-height:20px; color:#4e8abe; float:left!important;" onclick="CancelThirdModal()">Cancel</button>' +
                    '<button class="slds-button slds-button_brand" style="font-size:11px; line-height:20px; color:#edf5fa; float:right!important;" onclick="SaveJoinQuery()">Save</button>' +
                    '</footer>' +
                    '</div>' +
                    '</section>' +
                    '<div class="slds-backdrop slds-backdrop_open"></div>';
            } else if (FirstDEExtKeyForJoinGlobal in DEListMap.DataViewMap) {
                joinTwoDivString = '<section role="dialog" tabindex="-1" aria-labelledby="modal-heading-01" aria-modal="true" aria-describedby="modal-content-id-1" class="slds-modal slds-fade-in-open">' +
                    '<div class="slds-modal__container">' +
                    '<header class="slds-modal__header" style="margin:0; padding:0; background-color: #e9f0f4; ">' +
                    '<button class="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse" title="Close" onclick="CancelThirdModal()" style=" position: sticky; margin-left: 94%;">' +
                    ' <svg class="slds-button__icon slds-button__icon_large" aria-hidden="true">' +
                    '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                    '</svg>' +
                    '<span class="slds-assistive-text">Close</span>' +
                    '</button>' +
                    ' <h3 id="modal-heading-03"  style="padding:0; margin:0; margin-top: -25px; margin-bottom: 7px; font-size: 15px; color: #4e8abe; text-align: left; margin-left: 2.1%;" id="DEnamemodal1">Data Extension Fields</h3>' +
                    '</header>' +
                    ' <div  id="errorBlockOfJoinModalWindow" style="display:none; background: white;">' +
                    '<div class="slds-notify slds-notify_alert slds-alert_warning" role="alert" style=" background-color: #c23934;width: 100%; height: 5vh;padding-top: 0%; border-radius: 0.25rem; justify-content: left;align-items: self-start;">' +
                    ' <span class="slds-assistive-text">warning</span>' +
                    '<span class="slds-icon_container slds-icon-utility-warning slds-m-right_x-small" title="Description of icon when needed" style="float: left; margin-left: 2%; margin-top: 1.3%;">' +
                    ' <svg class="slds-icon slds-icon_x-small" aria-hidden="true">' +
                    ' <use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use>' +
                    '</svg>' +
                    '</span>' +
                    '<p style="padding: 0; float: left; margin-top: 1%;">Please select all the fields below.</p>' +
                    '<div class="slds-notify__close">' +
                    '<button class="slds-button slds-button_icon slds-button_icon-small" title="Close" onclick="CancelErrorBlockOfJoinModalWindow()">' +
                    ' <svg class="slds-button__icon" aria-hidden="true" style="fill:white;">' +
                    '<use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#close"></use>' +
                    '</svg>' +
                    ' <span class="slds-assistive-text">Close</span>' +
                    '</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="slds-modal__content slds-p-around_medium" id="modal-content-id-1">' +
                    '<div >' +
                    '<img id="joinImageDiv" src="Left Outer Join.JPG" alt="Joins" width="200" height="140" style="display: block;margin-left: auto;margin-right: auto;">' +
                    '</div>' +
                    '<div class="slds-grid slds-wrap">' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                    '<label class="slds-form-element__label" for="text-input-id-1">First DE</label>' +
                    '<input style="width: 180px;" type="text" id="text-input-id-1" value="' + DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEName + '" disabled="" class="slds-input" />' +
                    '</div>' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                    '<label class="slds-form-element__label" for="select-01">Join Type</label>' +
                    '<select onchange="selectJoinChange()" class="slds-select" style="width: 180px;" id="select-01">' +
                    '<option value="Left Outer Join">Left Outer Join</option>' +
                    '<option value="Left Outer Join with Exclusion">Left Outer Join with Exclusion</option>' +
                    '<option value="Right Outer Join">Right Outer Join</option>' +
                    '<option value="Right Outer Join with Exclusion">Right Outer Join with Exclusion</option>' +
                    '<option value="Inner Join">Inner Join</option>' +
                    '<option value="Full Outer Join">Full Outer Join</option>' +
                    '<option value="Outer Join">Outer Join</option>' +
                    '</select>' +
                    '</div>' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small">' +
                    '<label class="slds-form-element__label" for="select-02">Second DE</label>' +
                    '<select onchange="SecondDEChange()" class="slds-select" style="width: 180px;" id="select-02" >' +
                    '<option value=" ">Select…</option>';
                for (var DEExtKeyLoop of Array.from(DESetQueryBox)) {
                    if (FirstDEExtKeyForJoinGlobal != DEExtKeyLoop) {
                        if (DEExtKeyLoop in DEListMap.DEMap) {
                            joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DEMap[DEExtKeyLoop].DEName + '</option>';
                        } else if (DEExtKeyLoop in DEListMap.SharedDEMap) {
                            joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.SharedDEMap[DEExtKeyLoop].DEName + '</option>';
                        } else if (DEExtKeyLoop in DEListMap.DataViewMap) {
                            joinTwoDivString += '<option value="' + DEExtKeyLoop + '">' + DEListMap.DataViewMap[DEExtKeyLoop].DEName + '</option>';
                        }
                    }
                }
                joinTwoDivString += '</select>' +
                    '</div>' +
                    '</div>' +
                    '<div class="slds-grid slds-wrap">' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 17%;">' +
                    '<label class="slds-form-element__label" for="FirstDEField">First DE Field For Join</label>' +

                    '<select class="slds-select" style="width: 180px;" id="FirstDEField">' +
                    '<option value=" ">Select…</option>';
                for (var i in DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEFields) {
                    joinTwoDivString += '<option value="' + DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '">' + DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '</option>';
                }
                joinTwoDivString += '</select>' +
                    '</div>' +
                    '<div class="slds-col slds-size_1-of-1 slds-medium-size_4-of-12 slds-large-size_4-of-12 slds-p-around_small" style="margin-inline-start: 0%;">' +
                    '<label class="slds-form-element__label" for="SecondDEField">Second DE Field For Join</label>' +
                    '<select class="slds-select" style="width: 180px;" id="SecondDEField">' +
                    '<option value=" ">Select…</option>' +
                    '</select>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<footer class="slds-modal__footer" style="background:linear-gradient(#edf5fa,#fff); border-top:1px solid #eee; border-radius:0 0 5px 5px; background-repeat:repeat-x;">' +
                    '<button class="slds-button slds-button_neutral slds-float_left" style="font-size:11px; line-height:20px; color:#4e8abe; float:left!important;" onclick="CancelThirdModal()">Cancel</button>' +

                    '<button class="slds-button slds-button_brand" style="font-size:11px; line-height:20px; color:#edf5fa; float:right!important;" onclick="SaveJoinQuery()">Save</button>' +
                    '</footer>' +
                    '</div>' +
                    '</section>' +
                    '<div class="slds-backdrop slds-backdrop_open"></div>';
            }
            //-----------------------ends here--------------------------------------
        } else {}
        
        document.getElementById('ThirdModal').innerHTML = joinTwoDivString;
        document.getElementById('ThirdModal').style.display = 'block';

    }
    function selectJoinChange() {
        document.getElementById('joinImageDiv').src = document.getElementById('select-01').value + '.JPG';
    }
    function SecondDEChange() {
        var counter = 0;
        for (var key in JoinQueryDetails.DEForJoin) {
            if (JoinQueryDetails.DEForJoin[key].FirstDEExtKey == FirstDEExtKeyForJoinGlobal) {
                if (JoinQueryDetails.DEForJoin[key].SecondDEExtKey == document.getElementById('select-02').value) {
                    //document.getElementById('SecondDEField').value=JoinQueryDetails.DEForJoin[key].SecondDEJoinField
                    document.getElementById('FirstDEField').value = JoinQueryDetails.DEForJoin[key].FirstDEJoinField
                    document.getElementById('select-01').value = JoinQueryDetails.DEForJoin[key].JoinType
                    document.getElementById('SaveButton').innerHTML = "update";
                    counter = 1
                    break;
                }
            }
            if (JoinQueryDetails.DEForJoin[key].SecondDEExtKey == FirstDEExtKeyForJoinGlobal) {
                if (JoinQueryDetails.DEForJoin[key].FirstDEExtKey == document.getElementById('select-02').value) {
                    document.getElementById('FirstDEField').value = JoinQueryDetails.DEForJoin[key].SecondDEJoinField
                    document.getElementById('select-01').value = JoinQueryDetails.DEForJoin[key].JoinType
                    document.getElementById('SaveButton').innerHTML = "update";
                    counter = 2
                    break;
                }
            }
        }
        if (DESetQueryBox.has(document.getElementById('select-02').value)) {
            var secondDEExt = document.getElementById('select-02').value;
            document.getElementById('SecondDEField').innerHTML = '<option value="">Select…</option>';
            if (secondDEExt in DEListMap.DEMap) {
                for (var i in DEListMap.DEMap[document.getElementById('select-02').value].DEFields) {
                    document.getElementById('SecondDEField').innerHTML += '<option value="' + DEListMap.DEMap[document.getElementById('select-02').value].DEFields[i]["FieldName"] + '">' + DEListMap.DEMap[document.getElementById('select-02').value].DEFields[i]["FieldName"] + '</option>';
                }
            } else if (secondDEExt in DEListMap.SharedDEMap) {
                for (var i in DEListMap.SharedDEMap[document.getElementById('select-02').value].DEFields) {
                    document.getElementById('SecondDEField').innerHTML += '<option value="' + DEListMap.SharedDEMap[document.getElementById('select-02').value].DEFields[i]["FieldName"] + '">' + DEListMap.SharedDEMap[document.getElementById('select-02').value].DEFields[i]["FieldName"] + '</option>';
                }
            } else if (secondDEExt in DEListMap.DataViewMap) {
                for (var i in DEListMap.DataViewMap[document.getElementById('select-02').value].DEFields) {
                    document.getElementById('SecondDEField').innerHTML += '<option value="' + DEListMap.DataViewMap[document.getElementById('select-02').value].DEFields[i]["FieldName"] + '">' + DEListMap.DataViewMap[document.getElementById('select-02').value].DEFields[i]["FieldName"] + '</option>';
                }
            }
        } else {
            document.getElementById('SecondDEField').innerHTML = '<option value="">Select…</option>';
            document.getElementById('SaveButton').innerHTML = "Save";
            document.getElementById('FirstDEField').innerHTML = '<option value="">Select…</option>';
            if (FirstDEExtKeyForJoinGlobal in DEListMap.DEMap) {
                for (var i in DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields) {
                    document.getElementById('FirstDEField').innerHTML += '<option value="' + DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '">' + DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '</option>';
                }
            } else if (FirstDEExtKeyForJoinGlobal in DEListMap.SharedDEMap) {
                for (var i in DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields) {
                    document.getElementById('FirstDEField').innerHTML += '<option value="' + DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '">' + DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '</option>';
                }
            } else if (FirstDEExtKeyForJoinGlobal in DEListMap.DataViewMap) {
                for (var i in DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields) {
                    document.getElementById('FirstDEField').innerHTML += '<option value="' + DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '">' + DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEFields[i]["FieldName"] + '</option>';
                }
            }
        }
        if (counter == 1) {
            document.getElementById('SecondDEField').value = JoinQueryDetails.DEForJoin[key].SecondDEJoinField
        }
    }
    //--end of code by nitik
    function CancelThirdModal() {
        document.getElementById('ThirdModal').style.display = 'none';
    }
    function SaveJoinQuery() {
        var counter = 0;
        for (var key in JoinQueryDetails.DEForJoin) {
            if (JoinQueryDetails.DEForJoin[key].FirstDEExtKey == FirstDEExtKeyForJoinGlobal) {
                if (JoinQueryDetails.DEForJoin[key].SecondDEExtKey == document.getElementById('select-02').value) {
                    counter = 1;
                    break
                }
            }
        }
        if (counter == 1) {
            if (JoinQueryDetails.DEForJoin[key].FirstDEJoinField != document.getElementById('FirstDEField').value) {
                JoinQueryDetails.DEForJoin[key].FirstDEJoinField = document.getElementById('FirstDEField').value;
            }
            if (JoinQueryDetails.DEForJoin[key].SecondDEJoinField != document.getElementById('SecondDEField').value) {
                JoinQueryDetails.DEForJoin[key].SecondDEJoinField = document.getElementById('SecondDEField').value;
            }
            if (JoinQueryDetails.DEForJoin[key].JoinType != document.getElementById('select-01').value) {

                JoinQueryDetails.DEForJoin[key].JoinType = document.getElementById('select-01').value;

            }
            document.getElementById('ThirdModal').style.display = 'none';
        }
        else if (counter == 0) {
            if (document.getElementById('select-02').value == "" || document.getElementById('FirstDEField').value == "" || document.getElementById('SecondDEField').value == "") {
                document.getElementById('errorBlockOfJoinModalWindow').style.display = 'Block';
                return;
            }
            if (FirstDEExtKeyForJoinGlobal in DEListMap.DEMap && document.getElementById('select-02').value in DEListMap.DEMap) {
                joinedDivSet.add(FirstDEExtKeyForJoinGlobal);
                joinedDivSet.add(document.getElementById('select-02').value);
                if (JSON.stringify(JoinQueryDetails["PrimaryDE"]) == '{}') {
                    JoinQueryDetails["PrimaryDE"] = {
                        "DEName": DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEName,
                        "JoinField": document.getElementById('FirstDEField').value
                    }
                }
                //Added by ANIL KUMAR
                var line_ID = FirstDEExtKeyForJoinGlobal + document.getElementById('select-02').value;
                var newLine_Div = document.createElement('div');
                newLine_Div.id = line_ID;
                document.getElementById(FirstDEExtKeyForJoinGlobal + "##").appendChild(newLine_Div);
                JoinQueryDetails["DEForJoin"].push({
                    "FirstDEName": DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEName,
                    "FirstDEExtKey": FirstDEExtKeyForJoinGlobal,
                    "FirstDEJoinField": document.getElementById('FirstDEField').value,
                    "JoinType": document.getElementById('select-01').value,                 
                    "SecondDEName": DEListMap.DEMap[document.getElementById('select-02').value].DEName,
                    "SecondDEExtKey": document.getElementById('select-02').value,
                    "SecondDEJoinField": document.getElementById('SecondDEField').value,
                    "JoinedLineDivId": line_ID
                });
                var line_Color = "#353535";
                joinQueryBoxLine(FirstDEExtKeyForJoinGlobal, document.getElementById('select-02').value, line_ID, line_Color);
            } else if (FirstDEExtKeyForJoinGlobal in DEListMap.DEMap && document.getElementById('select-02').value in DEListMap.SharedDEMap) {
                joinedDivSet.add(FirstDEExtKeyForJoinGlobal);
                joinedDivSet.add(document.getElementById('select-02').value);
                if (JSON.stringify(JoinQueryDetails["PrimaryDE"]) == '{}') {
                    JoinQueryDetails["PrimaryDE"] = {
                        "DEName": DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEName,
                        "JoinField": document.getElementById('FirstDEField').value
                    }
                }
                //Added by ANIL KUMAR
                var line_ID = FirstDEExtKeyForJoinGlobal + document.getElementById('select-02').value;
                var newLine_Div = document.createElement('div');
                newLine_Div.id = line_ID;
                document.getElementById(FirstDEExtKeyForJoinGlobal + "##").appendChild(newLine_Div);
                JoinQueryDetails["DEForJoin"].push({
                    "FirstDEName": DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEName,
                    "FirstDEExtKey": FirstDEExtKeyForJoinGlobal,
                    "FirstDEJoinField": document.getElementById('FirstDEField').value,
                    "JoinType": document.getElementById('select-01').value,
                    "SecondDEName": DEListMap.SharedDEMap[document.getElementById('select-02').value].DEName,
                    "SecondDEExtKey": document.getElementById('select-02').value,
                    "SecondDEJoinField": document.getElementById('SecondDEField').value,
                    "JoinedLineDivId": line_ID
                });
                var line_Color = "#353535";
                joinQueryBoxLine(FirstDEExtKeyForJoinGlobal, document.getElementById('select-02').value, line_ID, line_Color);
            } else if (FirstDEExtKeyForJoinGlobal in DEListMap.DEMap && document.getElementById('select-02').value in DEListMap.DataViewMap) {

                joinedDivSet.add(FirstDEExtKeyForJoinGlobal);
                joinedDivSet.add(document.getElementById('select-02').value);
                if (JSON.stringify(JoinQueryDetails["PrimaryDE"]) == '{}') {
                    JoinQueryDetails["PrimaryDE"] = {
                        "DEName": DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEName,
                        "JoinField": document.getElementById('FirstDEField').value
                    }
                }
                //Added by ANIL KUMAR
                var line_ID = FirstDEExtKeyForJoinGlobal + document.getElementById('select-02').value;
                var newLine_Div = document.createElement('div');
                newLine_Div.id = line_ID;
                document.getElementById(FirstDEExtKeyForJoinGlobal + "##").appendChild(newLine_Div);
                JoinQueryDetails["DEForJoin"].push({
                    "FirstDEName": DEListMap.DEMap[FirstDEExtKeyForJoinGlobal].DEName,
                    "FirstDEExtKey": FirstDEExtKeyForJoinGlobal,
                    "FirstDEJoinField": document.getElementById('FirstDEField').value,
                    "JoinType": document.getElementById('select-01').value,
                    "SecondDEName": DEListMap.DataViewMap[document.getElementById('select-02').value].DEName,
                    "SecondDEExtKey": document.getElementById('select-02').value,
                    "SecondDEJoinField": document.getElementById('SecondDEField').value,
                    "JoinedLineDivId": line_ID
                });
                var line_Color = "#353535";
                joinQueryBoxLine(FirstDEExtKeyForJoinGlobal, document.getElementById('select-02').value, line_ID, line_Color);
            } else if (FirstDEExtKeyForJoinGlobal in DEListMap.SharedDEMap && document.getElementById('select-02').value in DEListMap.SharedDEMap) {
                joinedDivSet.add(FirstDEExtKeyForJoinGlobal);
                joinedDivSet.add(document.getElementById('select-02').value);
                if (JSON.stringify(JoinQueryDetails["PrimaryDE"]) == '{}') {
                    JoinQueryDetails["PrimaryDE"] = {
                        "DEName": DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEName,
                        "JoinField": document.getElementById('FirstDEField').value
                    }
                }
                //Added by ANIL KUMAR
                var line_ID = FirstDEExtKeyForJoinGlobal + document.getElementById('select-02').value;
                var newLine_Div = document.createElement('div');
                newLine_Div.id = line_ID;
                document.getElementById(FirstDEExtKeyForJoinGlobal + "##").appendChild(newLine_Div);
                JoinQueryDetails["DEForJoin"].push({
                    "FirstDEName": DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEName,
                    "FirstDEExtKey": FirstDEExtKeyForJoinGlobal,
                    "FirstDEJoinField": document.getElementById('FirstDEField').value,
                    "JoinType": document.getElementById('select-01').value,
                    "SecondDEName": DEListMap.SharedDEMap[document.getElementById('select-02').value].DEName,
                    "SecondDEExtKey": document.getElementById('select-02').value,
                    "SecondDEJoinField": document.getElementById('SecondDEField').value,
                    "JoinedLineDivId": line_ID
                });
                var line_Color = "#353535";
                joinQueryBoxLine(FirstDEExtKeyForJoinGlobal, document.getElementById('select-02').value, line_ID, line_Color);
            } else if (FirstDEExtKeyForJoinGlobal in DEListMap.SharedDEMap && document.getElementById('select-02').value in DEListMap.DEMap) {
                joinedDivSet.add(FirstDEExtKeyForJoinGlobal);
                joinedDivSet.add(document.getElementById('select-02').value);
                if (JSON.stringify(JoinQueryDetails["PrimaryDE"]) == '{}') {
                    JoinQueryDetails["PrimaryDE"] = {
                        "DEName": DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEName,
                        "JoinField": document.getElementById('FirstDEField').value
                    }
                }
                //Added by ANIL KUMAR
                var line_ID = FirstDEExtKeyForJoinGlobal + document.getElementById('select-02').value;
                var newLine_Div = document.createElement('div');
                newLine_Div.id = line_ID;
                document.getElementById(FirstDEExtKeyForJoinGlobal + "##").appendChild(newLine_Div);
                JoinQueryDetails["DEForJoin"].push({
                    "FirstDEName": DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEName,
                    "FirstDEExtKey": FirstDEExtKeyForJoinGlobal,
                    "FirstDEJoinField": document.getElementById('FirstDEField').value,
                    "JoinType": document.getElementById('select-01').value,
                    "SecondDEName": DEListMap.DEMap[document.getElementById('select-02').value].DEName,
                    "SecondDEExtKey": document.getElementById('select-02').value,
                    "SecondDEJoinField": document.getElementById('SecondDEField').value,
                    "JoinedLineDivId": line_ID
                });
                var line_Color = "#353535";
                joinQueryBoxLine(FirstDEExtKeyForJoinGlobal, document.getElementById('select-02').value, line_ID, line_Color);
            } else if (FirstDEExtKeyForJoinGlobal in DEListMap.SharedDEMap && document.getElementById('select-02').value in DEListMap.DataViewMap) {
                joinedDivSet.add(FirstDEExtKeyForJoinGlobal);
                joinedDivSet.add(document.getElementById('select-02').value);
                if (JSON.stringify(JoinQueryDetails["PrimaryDE"]) == '{}') {
                    JoinQueryDetails["PrimaryDE"] = {
                        "DEName": DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEName,
                        "JoinField": document.getElementById('FirstDEField').value
                    }
                }
                //Added by ANIL KUMAR
                var line_ID = FirstDEExtKeyForJoinGlobal + document.getElementById('select-02').value;
                var newLine_Div = document.createElement('div');
                newLine_Div.id = line_ID;
                document.getElementById(FirstDEExtKeyForJoinGlobal + "##").appendChild(newLine_Div);
                JoinQueryDetails["DEForJoin"].push({
                    "FirstDEName": DEListMap.SharedDEMap[FirstDEExtKeyForJoinGlobal].DEName,
                    "FirstDEExtKey": FirstDEExtKeyForJoinGlobal,
                    "FirstDEJoinField": document.getElementById('FirstDEField').value,

                    "JoinType": document.getElementById('select-01').value,
                    //"WhereClauseANDOR": document.getElementById('selectWhereClauseANDOR').value,

                    "SecondDEName": DEListMap.DataViewMap[document.getElementById('select-02').value].DEName,
                    "SecondDEExtKey": document.getElementById('select-02').value,
                    "SecondDEJoinField": document.getElementById('SecondDEField').value,
                    "JoinedLineDivId": line_ID
                });
                var line_Color = "#353535";
                joinQueryBoxLine(FirstDEExtKeyForJoinGlobal, document.getElementById('select-02').value, line_ID, line_Color);
            } else if (FirstDEExtKeyForJoinGlobal in DEListMap.DataViewMap && document.getElementById('select-02').value in DEListMap.DataViewMap) {
                joinedDivSet.add(FirstDEExtKeyForJoinGlobal);
                joinedDivSet.add(document.getElementById('select-02').value);
                if (JSON.stringify(JoinQueryDetails["PrimaryDE"]) == '{}') {
                    JoinQueryDetails["PrimaryDE"] = {
                        "DEName": DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEName,
                        "JoinField": document.getElementById('FirstDEField').value
                    }
                }
                //Added by ANIL KUMAR
                var line_ID = FirstDEExtKeyForJoinGlobal + document.getElementById('select-02').value;
                var newLine_Div = document.createElement('div');
                newLine_Div.id = line_ID;
                document.getElementById(FirstDEExtKeyForJoinGlobal + "##").appendChild(newLine_Div);
                JoinQueryDetails["DEForJoin"].push({
                    "FirstDEName": DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEName,
                    "FirstDEExtKey": FirstDEExtKeyForJoinGlobal,
                    "FirstDEJoinField": document.getElementById('FirstDEField').value,
                    "JoinType": document.getElementById('select-01').value,
                    "SecondDEName": DEListMap.DataViewMap[document.getElementById('select-02').value].DEName,
                    "SecondDEExtKey": document.getElementById('select-02').value,
                    "SecondDEJoinField": document.getElementById('SecondDEField').value,
                    "JoinedLineDivId": line_ID
                });
                var line_Color = "#353535";
                joinQueryBoxLine(FirstDEExtKeyForJoinGlobal, document.getElementById('select-02').value, line_ID, line_Color);
            } else if (FirstDEExtKeyForJoinGlobal in DEListMap.DataViewMap && document.getElementById('select-02').value in DEListMap.DEMap) {
                joinedDivSet.add(FirstDEExtKeyForJoinGlobal);
                joinedDivSet.add(document.getElementById('select-02').value);
                if (JSON.stringify(JoinQueryDetails["PrimaryDE"]) == '{}') {
                    JoinQueryDetails["PrimaryDE"] = {
                        "DEName": DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEName,
                        "JoinField": document.getElementById('FirstDEField').value
                    }
                }
                //Added by ANIL KUMAR
                var line_ID = FirstDEExtKeyForJoinGlobal + document.getElementById('select-02').value;
                var newLine_Div = document.createElement('div');
                newLine_Div.id = line_ID;
                document.getElementById(FirstDEExtKeyForJoinGlobal + "##").appendChild(newLine_Div);
                JoinQueryDetails["DEForJoin"].push({
                    "FirstDEName": DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEName,
                    "FirstDEExtKey": FirstDEExtKeyForJoinGlobal,
                    "FirstDEJoinField": document.getElementById('FirstDEField').value,
                    "JoinType": document.getElementById('select-01').value,
                    "SecondDEName": DEListMap.DEMap[document.getElementById('select-02').value].DEName,
                    "SecondDEExtKey": document.getElementById('select-02').value,
                    "SecondDEJoinField": document.getElementById('SecondDEField').value,
                    "JoinedLineDivId": line_ID
                });
                var line_Color = "#353535";
                joinQueryBoxLine(FirstDEExtKeyForJoinGlobal, document.getElementById('select-02').value, line_ID, line_Color);
            } else if (FirstDEExtKeyForJoinGlobal in DEListMap.DataViewMap && document.getElementById('select-02').value in DEListMap.SharedDEMap) {
                joinedDivSet.add(FirstDEExtKeyForJoinGlobal);
                joinedDivSet.add(document.getElementById('select-02').value);
                if (JSON.stringify(JoinQueryDetails["PrimaryDE"]) == '{}') {
                    JoinQueryDetails["PrimaryDE"] = {
                        "DEName": DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEName,
                        "JoinField": document.getElementById('FirstDEField').value
                    }
                }
                //Added by ANIL KUMAR
                var line_ID = FirstDEExtKeyForJoinGlobal + document.getElementById('select-02').value;
                var newLine_Div = document.createElement('div');
                newLine_Div.id = line_ID;
                document.getElementById(FirstDEExtKeyForJoinGlobal + "##").appendChild(newLine_Div);
                JoinQueryDetails["DEForJoin"].push({
                    "FirstDEName": DEListMap.DataViewMap[FirstDEExtKeyForJoinGlobal].DEName,
                    "FirstDEExtKey": FirstDEExtKeyForJoinGlobal,
                    "FirstDEJoinField": document.getElementById('FirstDEField').value,
                    "JoinType": document.getElementById('select-01').value,
                    "SecondDEName": DEListMap.SharedDEMap[document.getElementById('select-02').value].DEName,
                    "SecondDEExtKey": document.getElementById('select-02').value,
                    "SecondDEJoinField": document.getElementById('SecondDEField').value,
                    "JoinedLineDivId": line_ID
                });
                var line_Color = "#353535";
                joinQueryBoxLine(FirstDEExtKeyForJoinGlobal, document.getElementById('select-02').value, line_ID, line_Color);
            }
            document.getElementById('ThirdModal').style.display = 'none';
        }
    }
    //****************************************Edited By ANIL KUMAR******************************************
    function joinQueryBoxLine(de1, de2, lineid, lineColor) {
        var val1 = de1 + "#ForConnectedLine";
        var val2 = de2 + "#ForConnectedLine";
        var div1 = document.getElementById(val1);
        var div2 = document.getElementById(val2);
        var div1_pos = div1.getBoundingClientRect();
        var div2_pos = div2.getBoundingClientRect();
        if (div1_pos.left < div2_pos.left) {
            var x1 = div1.offsetLeft + div1.offsetWidth;
            var y1 = div1.offsetTop + 10;
            var x2 = div2.offsetLeft;
            var y2 = (div2.offsetTop + div2_pos.height / 2);
        } else {
            var x1 = div1.offsetLeft;
            var y1 = (div1.offsetTop + div1_pos.height / 2);
            var x2 = div2.offsetLeft + div2.offsetWidth;
            var y2 = div2.offsetTop + 10;
        } 
        var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
        var cx = ((x1 + x2) / 2) - (length / 2);
        var cy = ((y1 + y2) / 2);           
        var angle = Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
        var lineElement = document.getElementById(lineid).style.cssText = `
                    opacity: 0.9;
                    margin: 0px;
                    height:  2px;
                    background-color:${lineColor};
                    line-height: 1px;
                    left: ${cx}px;
                    top: ${cy}px;
                    width:${length}px;
                    -moz-transform: rotate(${angle}deg);
                    -webkit-transform: rotate(${angle}deg);
                    -o-transform: rotate(${angle}deg);
                    -ms-transform: rotate(${angle}deg);
                    position: absolute;
                    `;

    }
    //****************************************FINISH(ANIL KUMAR)******************************************    
    function joinQueryboxAlert() {
        document.getElementById("joinQueryboxAlert").style.display = "none";

    }
    function deleteDiv(DEExtKeyFordeleteDiv) {
        var SetValStr = '';
        document.getElementById('deleteModal').style.display = 'block';
        if (joinedDivSet.has(DEExtKeyFordeleteDiv)) {
            document.getElementById('deleteModal').style.display = 'none';
            document.getElementById("joinQueryboxAlert").style.display = "block";
            setTimeout(function() {
                document.getElementById("joinQueryboxAlert").style.display = 'none';
            }, 5000);
            return;
        } else {
            if (DEExtKeyFordeleteDiv in DEListMap.DEMap) {
                for (var key in DEListMap.DEMap[DEExtKeyFordeleteDiv].DESelectedFields) {
                    SetValStr = JSON.stringify({
                        "FieldName": DEListMap.DEMap[DEExtKeyFordeleteDiv].DEName + " " + DEListMap.DEMap[DEExtKeyFordeleteDiv].DESelectedFields[key]["FieldName"],
                        "FieldType": DEListMap.DEMap[DEExtKeyFordeleteDiv].DESelectedFields[key]["FieldType"]
                    });
                    if (NewDEFieldsSet.has(SetValStr)) {
                        NewDEFieldsSet.delete(SetValStr);
                    }
                }
            } else if (DEExtKeyFordeleteDiv in DEListMap.SharedDEMap) {
                for (var key in DEListMap.SharedDEMap[DEExtKeyFordeleteDiv].DESelectedFields) {
                    SetValStr = JSON.stringify({
                        "FieldName": DEListMap.SharedDEMap[DEExtKeyFordeleteDiv].DEName + " " + DEListMap.SharedDEMap[DEExtKeyFordeleteDiv].DESelectedFields[key]["FieldName"],
                        "FieldType": DEListMap.SharedDEMap[DEExtKeyFordeleteDiv].DESelectedFields[key]["FieldType"]
                    });
                    if (NewDEFieldsSet.has(SetValStr)) {
                        NewDEFieldsSet.delete(SetValStr);
                    }
                }
            } else if (DEExtKeyFordeleteDiv in DEListMap.DataViewMap) {
                for (var key in DEListMap.DataViewMap[DEExtKeyFordeleteDiv].DESelectedFields) {
                    SetValStr = JSON.stringify({
                        "FieldName": DEListMap.DataViewMap[DEExtKeyFordeleteDiv].DEName + " " + DEListMap.DataViewMap[DEExtKeyFordeleteDiv].DESelectedFields[key]["FieldName"],
                        "FieldType": DEListMap.DataViewMap[DEExtKeyFordeleteDiv].DESelectedFields[key]["FieldType"]
                    });
                    if (NewDEFieldsSet.has(SetValStr)) {
                        NewDEFieldsSet.delete(SetValStr);
                    }
                }
            }
            externalKey = DEExtKeyFordeleteDiv;
        }
    }
    function deleteQueryBox() {
        DESetQueryBox.delete(externalKey);
        document.getElementById(externalKey + '##').remove();
        document.getElementById('deleteModal').style.display = 'none';
    }
    function CancelErrorBlockOfJoinModalWindow() {
        document.getElementById('errorBlockOfJoinModalWindow').style.display = 'none';
    }
    function spinnerOnLoad() {
        document.getElementById('FullPageSpinner').style.display = 'block';
        document.getElementById('DEListSidebar').style.marginTop = '-650px';
    }

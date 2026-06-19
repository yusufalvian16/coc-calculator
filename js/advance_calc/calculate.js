// Calculate damage log for all defenses
function calc() {
    defenseDivs.forEach((defenseDiv) => {   
        calcDefense(defenseDiv);
    });
    filterDefenses();
}

// Calculate damage log for defense
function calcDefense(defenseDiv) {
    const defenseID = HTMLUtil.getDataID(defenseDiv);
    const defense = defenseListManager.getDefense(defenseID);
    if (defense === null) {
        throw new Error(`Invalid defenseID: ${defenseID}`);
    }

    const damageLogDisplay = defenseDiv.querySelector(".damage-log-display");
    const damageLogList = getDamageLogList(defense);

    // Optimize DOM updates by checking if result signature is identical
    const signature = defense.getCurrentMaxHP() + "|" + damageLogList.damageLogList.map(log => log.remainingHP).join(",");
    if (defenseDiv.dataset.lastSignature === signature) {
        return;
    }
    defenseDiv.dataset.lastSignature = signature;

    toggleCollapseBtnText(defenseDiv.querySelector(".show-more-btn"), false);
    HTMLUtil.toggleBSCollapse(defenseDiv.querySelector(`#showMore-${defenseID}`), false);

    HTMLUtil.removeAllChilds(damageLogDisplay);

    // Add each damage log into the row of detail section of defense
    let orderCount = 0;
    for (const damageLog of damageLogList.damageLogList) {
        orderCount++;
        const damageLogRow = AdvanceHTMLUtil.createDamageLogRow(damageLog, orderCount);       
        
        damageLogDisplay.appendChild(damageLogRow);
    }

    // Update image and hp of defense div
    const defenseImg = defenseDiv.querySelector(".image--main");
    const defenseHP = defenseDiv.querySelector(".hp");
    const maxHP = defense.getCurrentMaxHP();
    let remainingHP = maxHP;
    if (!damageLogList.isEmpty()) {
        remainingHP = damageLogList.getLast().remainingHP;
    }

    defenseHP.classList.remove("text--hp-full");
    defenseHP.classList.remove("text--destroyed");
    defenseHP.textContent = remainingHP;
    HTMLUtil.setDataDefenseStatus(defenseDiv, true);
    if (remainingHP === maxHP) {
        defenseHP.classList.add("text--hp-full"); 
        defenseImg.src = defense.getImagePath();    
    } else if (remainingHP <= 0) {
        defenseHP.classList.add("text--destroyed");
        HTMLUtil.setDataDefenseStatus(defenseDiv, false);
        defenseImg.src = defense.getDestroyedImagePath();
    } else {
        defenseImg.src = defense.getImagePath();
    }
}

// Create damage log list for defense
function getDamageLogList(defense) {
    if (defense instanceof Defense) {
        const clonedDefense = defense.clone();

        const damageLogListManager = new DamageLogListManager();
        damageLogListManager.loadWithActionList(clonedDefense, actionListManager);
        return damageLogListManager; 
    } else {
        throw new Error(`Invalid defense: ${defense}`);
    }
}
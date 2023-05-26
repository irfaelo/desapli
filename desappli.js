    const desappli = (condition = () => 1) => {
        let eventType;
        let eventElements;
        let actions = [];
        let shouldReverse = true;

        const applyChanges = () => {
            for (const action of actions) {
                switch (action.type) {
                    case 'hide':
                        action.elements.forEach(el => el.style.display = 'none');
                        break;
                    case 'show':
                        action.elements.forEach(el => el.style.display = 'block');
                        break;
                    case 'addClass':
                        action.elements.forEach(el => el.classList.add(action.className));
                        break;
                    case 'removeClass':
                        action.elements.forEach(el => el.classList.remove(action.className));
                        break;
                    // Agrega más casos según tus necesidades
                }
            }
        };

        const revertChanges = () => {
            for (const action of actions) {
                switch (action.type) {
                    case 'hide':
                        action.elements.forEach(el => el.style.display = 'block');
                        break;
                    case 'show':
                        action.elements.forEach(el => el.style.display = 'none');
                        break;
                    case 'addClass':
                        action.elements.forEach(el => el.classList.remove(action.className));
                        break;
                    case 'removeClass':
                        action.elements.forEach(el => el.classList.add(action.className));
                        break;
                    // Agrega más casos según tus necesidades
                }
            }
        };

        const checkCondition = () => {
            if (condition()) {
                applyChanges();
            } else if (shouldReverse) {
                revertChanges();
            }
        };

        const instance = {
            event(actionsArray, event) {
                eventType = event;
                actions = actionsArray;
                return instance;
            },
            scroll(actionsArray, reverse = true) {
                eventType = 'scroll';
                actions = actionsArray;
                shouldReverse = reverse;
                window.addEventListener(eventType, checkCondition);
                return instance;
            },
            on(elements) {
                eventElements = elements;
                eventElements.forEach(el => {
                    el.addEventListener(eventType, checkCondition);
                    if (eventType !== 'scroll') {
                        el.addEventListener('mouseout', revertChanges);
                    }
                });
            },
        }; 
        return instance;
    }

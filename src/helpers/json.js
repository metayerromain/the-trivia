class local {
    
    setLocalStorageItem = (file, element) => {
        localStorage.setItem(file, element);
    }
    getLocalStorageItem = file => {
        return localStorage.getItem(file);
    }

    removeLocalStorageItem = file => {
        return localStorage.removeItem(file);
    }

    page = (link, life, category) => {
        console.log('zbooob', life)
        var newSave = this.getLocalStorageItem('category-' + link);
        if (newSave !== null) {
            newSave = JSON.parse(newSave);
            newSave.pop();
        } else {
            newSave = [0, 0]
        }
        newSave.push(life - 1);
        console.log(newSave);

        this.setLocalStorageItem('category-' + category.id, JSON.stringify(newSave));

    }
}

export default new local();

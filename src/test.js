function getNames() {
    // get names from the database or API
    const firstName = [1,2,3,4];
    const lastName = 4;
    // return values
    return {firstName,lastName};
}

const names = getNames();
const firstName = names.firstName;
const lastName = names.lastName;
console.log(firstName,lastName)
function wait(milis: number) {

    return new Promise(resolve => setTimeout(resolve, milis));

}

export default { wait };
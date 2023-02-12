const asyncAdd = async (a,b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return Promise.reject('Argumenty muszą mieć typ number!')
    }
    return new Promise((resolve, reject) => {
        setTimeout(() =>{
            resolve(a+b)
        }, 100)
    })
}

const sum  = async (...params) => {
    let currentSum = 0;
    for (let i = 0; i < params.length; i++){
        currentSum = await asyncAdd(currentSum, params[i]);
    }
}

const measurePerformance = async () => {
    const t0 = performance.now();

    await sum(...Array(100).keys());

    const t1 = performance.now();

    console.log(t1 - t0);
}

sum(...Array(10).keys());

measurePerformance();


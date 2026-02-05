function factorial(n:number): number{
    if (n < 1) {return 0}
    else if (n == 1) {return 1}
    return n * factorial(n-1)
}
console.log(factorial(4))
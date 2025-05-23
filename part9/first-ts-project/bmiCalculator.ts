export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / (height / 100) ** 2;
    // console.log(bmi);
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal range";
    } else if (bmi >= 25 && bmi < 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
};

// console.log(process.argv)
// console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])))
interface MultipleValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): MultipleValues => {
    if (args.length < 4) throw new Error("not enough arguments for the program");
    if (args.length > 4) throw new Error("too many arguments for the program");

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {    
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    } else {
        throw new Error("Provided values were not numbers!");
    }
};

// console.log(require.main)
if (require.main === module) {
    try {
        const {value1, value2} = parseArguments(process.argv);
        console.log(calculateBmi(value1, value2));
    } catch (error: unknown) {
        let errorMessage = "something bad happen";
        if (error instanceof Error) {
            errorMessage += " Error: " + error.message;
        }
        console.log(errorMessage);
    }
}
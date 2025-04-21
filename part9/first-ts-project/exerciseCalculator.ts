interface ResultObject {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface MultipleValues {
    target: number;
    dailyExercise: number[];
}

export const calculateExercises = (dailyExercise: number[], target: number):ResultObject => {
    const periodLength = dailyExercise.length;

    if (periodLength === 0) {
        throw new Error("No excerise data provied.");
    }

    if (dailyExercise.some((hours) => hours < 0)) {
        throw new Error("Some daily excerise values are negative.");
    }
    
    const trainingDays = dailyExercise.filter((day) => day > 0).length;
    console.log(dailyExercise);
    
    const totalHours = dailyExercise.reduce(
        (sum, hours) => sum + hours,
        0, 
    );
    const average = totalHours / periodLength;
    const success = average >= target;
    
    let rating: number;
    let ratingDescription: string;
    
    if (average >= target) {
        rating = 3;
        ratingDescription = "good work";
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = "not too bad but could be better";
    } else {
        rating = 1;
        ratingDescription = "need improvement";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

// const arrayCheck = (arr: string[]): [number[], boolean] => {
//     // const results: number[] = [];
//     // for (let i = 0; i < arr2.length; i++) {
//     //     const num = Number(arr2[i])
//     //     if (isNaN(num)) {
//     //         return [results, false]
//     //     }
//     //     results[i] = num;
//     // }
//     const results: number[] = arr.map(Number)
//     const isValid: boolean = results.every((e) => !isNaN(e))
//     return [results, isValid];

// }

const parseArguments = (args: string[]): MultipleValues => {
    if (args.length < 3) throw new Error("Not enough arguments.");
    // if (args.length > 10) throw new Error("Too many arguments.")
    
    const dailyExercise = args.slice(3).map(Number);
    const target = Number(args[2]);
    // const [results, isValid] = arrayCheck(slicedArr)
    const isValid = dailyExercise.every((e) => !isNaN(e));

    if (!isNaN(target) && isValid) {
        return {
            target,
            dailyExercise
        };
    } else {
        throw new Error("Provided valuess were not numbers!");
    }
};

try {
    const { target, dailyExercise } = parseArguments(process.argv);
    console.log(calculateExercises(dailyExercise, target));    
} catch (error: unknown) {
    let errorMessage = "something bad happened";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}

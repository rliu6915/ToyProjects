interface CalculateValues {
  target: number,
  trainingHours: Array<number>
}

export const parseArguments = (args: string[]): CalculateValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  
  if (!isNaN(Number(args[2])) && args.slice(3).every(a => !isNaN(Number(a)))) {
    return {
      target: Number(args[2]),
      trainingHours: args.slice(3).map(a => Number(a))
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const Header = ({name}) => {
    return (
        <h2>{name}</h2>
    )
}

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({parts}) => {
    const partElements = parts.map(part =>
        <Part
            key={part.id}
            part={part}
        />
    )
    return (
        <div>
            {partElements}
        </div>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce(
        (s, p) => s + p.exercises,
        0
    )
    return (
        <p>Total number of exercises {total}</p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course
import './input.css'
const Input = (props) => {
    return (
        <div className="input_container">
            <input className='input' placeholder={props.placeholder} type={props.type} value={props.value} onChange={(event) => props.setValue(event.target.value)} list={`searchHelper_${props.name}`} />
            <datalist className='searchHelper' id={`searchHelper_${props.name}`}>
                {
                    (Array.isArray(props.searchHelper) ? props.searchHelper : []).map((element) => (
                        <option className="searchHelper_text">{element.name}</option>
                    ))
                }
            </datalist>
        </div>
    )
}
export default Input
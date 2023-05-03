import Classes from "../styles/InputWithLabel.module.css"

const inputWithLabel = ({id , innerHTML , value , type , name , datalist , onChange}) => {

    return (
        <div className={Classes.inputWithLabel}>
            <label>
                {innerHTML}
            </label>
            <input className={Classes.input} type={type} name={name} list={datalist != undefined ? `${id}list` : ""} id={id} value={value} onChange={(e) => onChange(e.target.value) }/>
            {
                datalist != undefined 
                ? 
                <datalist id={`${id}list`}>{
                    datalist.map((data) =>  <option value={data} />)
                }</datalist>  
                :
                 <></>  
            }
        </div>
    )

}

export default inputWithLabel;
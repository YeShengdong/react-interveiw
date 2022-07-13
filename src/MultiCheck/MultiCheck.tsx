import './MultiCheck.css';

import React from 'react';
import { useEffect,useState } from 'react';

export type Option = {
	label: string;
	value: string;
};

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
	label?: string;
	options: Option[];
	columns?: number;
	values?: string[];
	onChange?: (options: Option[]) => void;
};

const MultiCheck: React.FunctionComponent<Props> = (props): JSX.Element => {
	// @todo
	const {columns=1,label,onChange,options,values} = props;
	const [columnLength,setColumnLength] = useState(columns);
	const [newOption,setOption] = useState(options);
	const [list,setList] = useState<any[]>([])

	useEffect(()=>{
		setColumnLength(Math.ceil((options.length+1)/columns))
		let tempArr = [{label: 'select all', value: '000',},...options]
		setOption(tempArr)
	},[columns,options])

	useEffect(()=>{
			let res = [];
			for(let i=0;i<columns;i++) {
				res[i]=newOption.slice(i*columnLength,(i+1)*columnLength)
			}
		setList(res)
	},[columnLength])

	return (
		<div className="container">
		<header>Status</header>
		<div className="wrap">
			{list.map((innerArray,i)=>{
				return <div className="columWrap" key={i}>
					{innerArray.map((item:any,index:number)=>{
					return <div key={item.label}>
						<input type="checkbox"/>
						<label className="checkbox-label">{item.label}</label>
				 	</div>
					})}
				</div>
			})}
		</div>
</div>
	);
};

export default MultiCheck;

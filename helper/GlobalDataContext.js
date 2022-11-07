import { createContext, useContext, useState } from 'react'

export const GlobalDataContext = createContext({
	model: null,
	setModel: async (model) => null,
	validation_suite_id: null,
	setValidationSuiteID: async (validation_suite_id) => null
})

export const useGlobalDataContext = () => useContext(GlobalDataContext)

export const GlobalDataProvider = ({ children }) => {
	const [model, setModel] = useState(null)
	const [validation_suite_id, setValidationSuiteID] = useState(null)

	return (
		<GlobalDataContext.Provider 
			value={{model, setModel, validation_suite_id, setValidationSuiteID}}
		>
			{children}
		</GlobalDataContext.Provider>
	)
}
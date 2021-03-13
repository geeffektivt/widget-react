import React, { useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import { useDispatch, useSelector } from 'react-redux'
// import Validator from 'validator'

// import { Organization } from '../../../@types/import/content/organizations.types'
// import { setShares } from '../../../store/donation/donation.actions'
// import { State } from '../../../store/state'
// import { OrganizationShare } from '../../../types/Temp'
// import { TextInput } from '../../shared/Input/TextInput'

// export const SharesSelection: React.FC = () => {
//   const dispatch = useDispatch()
//   const organizations = useSelector(
//     (state: State) => state.layout.organizations
//   )
//   const { register, watch } = useForm({ mode: 'all' })
//   const watchAllFields = watch()

//   /**
//    * TODO:
//    * Extract mappings to _mapping.ts
//    */
//   useEffect(() => {
//     if (Object.keys(watchAllFields).length > 0) {
//       const shares = Object.keys(watchAllFields).map(
//         (key): OrganizationShare => ({
//           id: parseInt(key),
//           share: Validator.isInt(watchAllFields[key])
//             ? parseInt(watchAllFields[key])
//             : 0,
//         })
//       )
//       dispatch(setShares(shares))
//     }
//   }, [watchAllFields])

//   if (!organizations) return <div>Ingen organisasjoner</div>

//   return (
//     <div>
//       <form>
//         <div>
//           {organizations.map((org: Organization) => (
//             <TextInput
//               label={org.name}
//               name={org.id.toString()}
//               key={org.id}
//               type="tel"
//               defaultValue={org.standardShare ? org.standardShare : 0}
//               denomination="%"
//               selectOnClick
//               innerRef={register}
//             />
//           ))}
//         </div>
//       </form>
//     </div>
//   )
// }

import { fetchAccountNatureService } from '../../../services/apis';

// export const account_natures = Array.from({ length: 20 }, () => {
//   const name = faker.person.fullName()
//   const code = faker.string.alphanumeric({ length: 5 })
//   return {
//     id: faker.string.uuid(),
//     name,
//     code,
//     description: faker.lorem.sentence(),
//     status: faker.helpers.arrayElement([
//       'active',
//       'inactive',
//     ]),
//     accounting_effect: faker.helpers.arrayElement(['debit', 'credit', null])

//   }
// })

export const account_natures = async () => {
  const data = await fetchAccountNatureService()
  console.log('account_natures', data);
  if (!data) {
    return []
  }
  return data.data
}
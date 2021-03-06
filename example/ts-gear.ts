import { IUserConfig } from 'ts-gear/bin/interface'

const config: IUserConfig = {
  dest: './service',
  projects: [
    {
      name: 'pet',
      source: 'fixture/pet.json',
      // source: 'http://petstore.swagger.io/v2/swagger.json',
    },
    // {
    //   name: 'projectA',
    //   source: 'fixture/projectA.json',
    // },
    // {
    //   name: 'projectB',
    //   source: 'fixture/projectB.json',
    // },
    // {
    //   name: 'projectC',
    //   source: 'fixture/projectC.json',
    // },
    // {
    //   name: 'projectD',
    //   source: 'fixture/projectD.json',
    // },
    {
      name: 'projectE',
      source: 'fixture/projectE.json',
    },
    // {
    //   name: 'projectPont',
    //   source: 'fixture/pontFixture.json',
    // },
  ],
}

export default config

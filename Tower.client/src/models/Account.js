
// export class Profile{
//   constructor(data){
//     this.name = data.name
//     this.picture = data.picture
//     this.id = data.id
//   }
// }

// export class Account extends Profile{
//   constructor(data){
//     super(data)
//     this.email = data.email
//   }
// }


export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.picture = data.picture
    // TODO add additional properties if needed
  }
}

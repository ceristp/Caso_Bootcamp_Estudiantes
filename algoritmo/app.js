import figlet from "figlet"
import chalk from "chalk"
import inquirer from "inquirer"
import PressToContinuePrompt from "inquirer-press-to-continue"

inquirer.registerPrompt("press-to-continue", PressToContinuePrompt)


class DemoConsola {
   #students = []
   constructor() {
      this.init()
   }

   /* Titulo */
   init() {
      console.log(chalk.yellow(figlet.textSync("Calcular Edad", { horizontalLayout: "full" })))
      this.mainMenu()
   }

   /* menu consola */
   mainMenu() {
      inquirer
         .prompt([
            {
               type: "list",
               name: "option",
               message: "¿Qué desea hacer?",
               choices: ["Crear estudiante", "Calcular edad de todos los estudiantes", "Salir"],
            },
         ])
         .then((answer) => {
            switch (answer.option) {
               case "Crear estudiante":
                  this.inputDate()
                  break
               case "Calcular edad de todos los estudiantes":
                  this.showAllAges()
                  this.awaitKey().then(() => this.mainMenu())
                  break
               case "Salir":
                  process.exit()
            }
         })
         .catch((error) => {
            console.log(error)
         })
   }

   /* introduce fecha alumno, valida y crea */
   inputDate() {
      inquirer
         .prompt([
            {
               type: "input",
               name: "date",
               message: "Ingrese la fecha de nacimiento en formato dd/mm/yyyy = ",
               validate: this.validateDate,
            },
         ])
         .then((answer) => {
            const [day, month, year] = answer.date.split("/")
            this.createStudent(new Date(`${year}-${month}-${day}`))
         })
         .catch((error) => {
            console.log(error)
         })
         .finally(() => {
            this.mainMenu()
         })
   }

   /* Crear un estudiante y almacenarlo en la lista de estudiantes */
   createStudent(date) {
      this.#students.push(new Estudiante(0, "11.111.111-1", "Doe", "Smith", "1234", date))
      console.log(chalk.green(`Estudiante creado con fecha de nacimiento ${answer.date}`))
      console.log(`Numero de estudiantes creados: ${chalk.green(this.#students.length)}`)
   }

   /* retorna arrays de los estudiantes */
   getAllAges() {
      return this.#students.map((student) => student.calculateAge())
   }

   /* muestra edad de los estudiantes */
   showAllAges() {
      if (this.#students.length === 0) return console.log(chalk.bgRed("No hay estudiantes creados"))
      this.getAllAges().forEach((age, i) => {
         console.log(chalk.bgGreen.black(`La edad del estudiante ${i + 1} es ${age} ${age == 1 ? "año" : "años"}`))
      })
   }

   /* prompt */
   async awaitKey() {
      const anyKey = (
         await inquirer.prompt({
            name: "key",
            type: "press-to-continue",
            anyKey: true,
            pressToContinueMessage: "Press a key to continue...",
         })
      ).key

      return new Promise((resolve) => {
         resolve("")
         console.log(anyKey.value ? "" : "error")
      })
   }

   /* validar fecha */
   validateDate(date) {
      if (!date.length) return chalk.bgRed("Por favor, ingrese una fecha de nacimiento")
      if (!date.match(/^\d{2}\/\d{2}\/\d{4}$/))
         return chalk.bgRed("Por favor, ingrese una fecha de nacimiento en formato dd/mm/yyyy")
      const [day, month, year] = date.split("/")
      if (day > 31 || month > 12 || year > 2022) {
         return chalk.bgRed("Por favor, ingrese una fecha de nacimiento válida")
      }
      return true
   }
}

/* Estudiantes */
class Estudiante {
   constructor(id, rut, lastNameDad, lastNameMom, address, birthDate) {
      let _id = id
      let _rut = rut
      let _lastNameDad = lastNameDad
      let _lastNameMom = lastNameMom
      let _address = address
      let _birthDate = birthDate

      this.getId = () => _id
      this.getRut = () => _rut
      this.getLastNameDad = () => _lastNameDad
      this.getLastNameMom = () => _lastNameMom
      this.getAddress = () => _address
      this.getBirthDate = () => _birthDate


      this.setId = (id) => (_id = id)
      this.setRut = (rut) => (_rut = rut)
      this.setLastNameDad = (lastNameDad) => (_lastNameDad = lastNameDad)
      this.setLastNameMom = (lastNameMom) => (_lastNameMom = lastNameMom)
      this.setAddress = (address) => (_address = address)
      this.setBirthDate = (birthDate) => (_birthDate = birthDate)
   }


   /* Calcula la edad */
   calculateAge() {
      let today = new Date()

      let age = today.getFullYear() - this.getBirthDate().getFullYear()
      let m = today.getMonth() - this.getBirthDate().getMonth()
      if (m < 0 || (m === 0 && today.getDate() < this.getBirthDate().getDate())) {
         age--
      }
      return age
   }
}

new DemoConsola()
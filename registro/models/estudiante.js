const client = require("../config/database")

/* GET */
const getStudents = async () => {
   const queryConf = {
      text: "SELECT * FROM Estudiante",
   }
   try {
      const students = await client.query(queryConf)
      return students.rows
   } catch (err) {
      console.error(`Error al obtener estudiantes de la base de datos:\n${err}`)
      throw err
   }
}

const getFilteredStudents = async (regionName, courseCode) => {
   let text,
      values = []
   if (regionName === "all" && courseCode === "all") {
      text =
         "SELECT e.rut, e.nombre, e.apellido_pat, e.apellido_mat , e.codigo_curso, pf.descripcion FROM Estudiante e LEFT JOIN Curso cu ON e.codigo_curso = cu.codigo_curso LEFT JOIN Plan_Formativo pf ON cu.codigo_plan_formativo = pf.codigo_plan_formativo LEFT JOIN Comuna co ON e.codigo_comuna = co.codigo_comuna LEFT JOIN Region r ON co.codigo_region = r.codigo_region"
   } else if (regionName === "all") {
      text =
         "SELECT e.rut, e.nombre, e.apellido_pat, e.apellido_mat , e.codigo_curso, pf.descripcion FROM Estudiante e LEFT JOIN Curso cu ON e.codigo_curso = cu.codigo_curso LEFT JOIN Plan_Formativo pf ON cu.codigo_plan_formativo = pf.codigo_plan_formativo LEFT JOIN Comuna co ON e.codigo_comuna = co.codigo_comuna LEFT JOIN Region r ON co.codigo_region = r.codigo_region WHERE e.codigo_curso = $1;"
      values = [courseCode]
   } else if (courseCode === "all") {
      text =
         "SELECT e.rut, e.nombre, e.apellido_pat, e.apellido_mat , e.codigo_curso, pf.descripcion FROM Estudiante e LEFT JOIN Curso cu ON e.codigo_curso = cu.codigo_curso LEFT JOIN Plan_Formativo pf ON cu.codigo_plan_formativo = pf.codigo_plan_formativo LEFT JOIN Comuna co ON e.codigo_comuna = co.codigo_comuna LEFT JOIN Region r ON co.codigo_region = r.codigo_region WHERE r.nombre = $1;"
      values = [regionName]
   } else {
      text =
         "SELECT e.rut, e.nombre, e.apellido_pat, e.apellido_mat , e.codigo_curso, pf.descripcion FROM Estudiante e LEFT JOIN Curso cu ON e.codigo_curso = cu.codigo_curso LEFT JOIN Plan_Formativo pf ON cu.codigo_plan_formativo = pf.codigo_plan_formativo LEFT JOIN Comuna co ON e.codigo_comuna = co.codigo_comuna LEFT JOIN Region r ON co.codigo_region = r.codigo_region WHERE e.codigo_curso = $1 AND r.nombre = $2;"
      values = [courseCode, regionName]
   }

   const queryConf = {
      text,
      values,
   }
   try {
      const filteredStudents = await client.query(queryConf)
      return filteredStudents.rows
   } catch (err) {
      console.error(`Error al obtener los estudiantes filtrados de la base de datos:\n${err}`)
      throw err
   }
}

const getFormattedStudents = async () => {
   const queryConf = {
      text: "SELECT e.rut, e.nombre, e.apellido_pat, e.apellido_mat , e.codigo_curso, pf.descripcion FROM Estudiante e LEFT JOIN Curso c ON e.codigo_curso = c.codigo_curso LEFT JOIN Plan_Formativo pf ON c.codigo_plan_formativo = pf.codigo_plan_formativo RETURNING *",
   }
   try {
      const students = await client.query(queryConf)
      return students.rows
   } catch (err) {
      console.error(`Error al obtener estudiantes de la DATABASE:\n${err}`)
      throw err
   }
}

/* exportacion de modulos */
module.exports = {
   getStudents,
   getFilteredStudents,
}
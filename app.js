var equipos = []
var partidos = []
var resultados = []

const equiposForm = document.querySelector('#equipos-form')
const partidosForm = document.querySelector('#partidos-form')

const equipoLocalSelect = document.querySelector('#equipo-local-select')
const equipoVisitanteSelect = document.querySelector('#equipo-visitante-select')

const actualizarListas = () => {
	const formData = new FormData(equiposForm)
	let equipoA = formData.get('equipo-a'),
		equipoB = formData.get('equipo-b'),
		equipoC = formData.get('equipo-c')

	equipos = [equipoA, equipoB, equipoC]

	const equipoInputs = document.querySelectorAll('.equipo-input')
	equipoInputs.forEach(equipoInput => equipoInput.value = '')

	recargarListas()
}

const recargarListas = () => {
	equipoLocalSelect.innerHTML = ''
	equipoVisitanteSelect.innerHTML = ''

	equipoLocalSelect.insertAdjacentHTML('beforeend',
		`<option disabled selected value>- Selecciona Equipo -</option>`
	)
	equipoVisitanteSelect.insertAdjacentHTML('beforeend',
		`<option disabled selected value>- Selecciona Equipo -</option>`
	)

	equipos.forEach(equipo => {
		equipoLocalSelect.insertAdjacentHTML('beforeend',
			`<option value="${equipo}">${equipo}</option>`
		)
		equipoVisitanteSelect.insertAdjacentHTML('beforeend',
			`<option value="${equipo}">${equipo}</option>`
		)
	})
}

const jugar = () => {
	const formData = new FormData(partidosForm)
	let equipoLocal = formData.get('equipo-local'),
		equipoVisitante = formData.get('equipo-visitante'),
		golesLocal = formData.get('goles-local'),
		golesVisitante = formData.get('goles-visitante')

	golesLocal = parseInt(golesLocal)
	golesVisitante = parseInt(golesVisitante)
	if (equipoLocal === equipoVisitante) {
		alert('Un equipo no puede competir contra sí mismo')
		return
	}

	if (golesLocal < 0 || golesLocal > 10) {
		alert('El valor de los goles del equipo local es inválido')
		return
	}

	if (golesVisitante < 0 || golesVisitante > 10) {
		alert('El valor de los goles del equipo visitante es inválido')
		return
	}

	let partido = {
		equipoLocal: equipoLocal,
		equipoVisitante: equipoVisitante,
		golesLocal: golesLocal,
		golesVisitante: golesVisitante,
	}
	partidos.push(partido)

	const equipoSelects = document.querySelectorAll('.equipo-select')
	equipoSelects.forEach(equipoSelect => equipoSelect.value = '')
	const golesInputs = document.querySelectorAll('.goles-input')
	golesInputs.forEach(golesInput => golesInput.value = '')

	publicarResultados()
}

const publicarResultados = () => {
	equipos.forEach(equipo => {
		let pj = 0,
			pg = 0,
			pe = 0,
			pp = 0,
			gf = 0,
			gc = 0,
			puntos = 0
		for (const partido of partidos) {
			if (equipo === partido.equipoLocal) {
				pj++
				gf += partido.golesLocal
				gc += partido.golesVisitante
				if (partido.golesLocal > partido.golesVisitante) {
					pg++
					puntos += 3
				} else if (partido.golesLocal < partido.golesVisitante) {
					pp++
				} else {
					pe++
					puntos++
				}
			} else if (equipo === partido.equipoVisitante) {
				pj++
				gf += partido.golesVisitante
				gc += partido.golesLocal
				if (partido.golesLocal > partido.golesVisitante) {
					pp++
				} else if (partido.golesLocal < partido.golesVisitante) {
					pg++
					puntos += 3
				} else {
					pe++
					puntos++
				}
			}
		}
		resultados.push([equipo, pj, pg, pe, pp, gf, gc])
	})

	llenarTablaResultados()
}

const llenarTablaResultados = () => {
	const rowEquipos = document.querySelectorAll('.row-equipo')

	for (let i = 0; i < 3; i++) {
		rowEquipos[i].innerHTML = ''
		resultados[i].forEach(campo => {
			rowEquipos[i].innerHTML += `<td>${campo}</td>`
		})
	}
}



equiposForm.addEventListener('submit', e => {
	e.preventDefault()
	actualizarListas()
})

partidosForm.addEventListener('submit', e => {
	e.preventDefault()
	jugar()
})

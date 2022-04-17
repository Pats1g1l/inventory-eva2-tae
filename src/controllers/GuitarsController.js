const GuitarsDAO = require('../models/dao/GuitarsDAO')

class GuitarsController {
  constructor (db) {
    this.guitarsDao = new GuitarsDAO(db)
    this.renderHomeWithGuitars = this.renderHomeWithGuitars.bind(this)
    this.renderSingleGuitars = this.renderSingleGuitars.bind(this)
    this.renderGuitarsCreationForm = this.renderGuitarsCreationForm.bind(this)
    this.renderGuitarsUpdateForm = this.renderGuitarsUpdateForm.bind(this)
    this.insertAndRenderGuitars = this.insertAndRenderGuitars.bind(this)
    this.updateAndRenderGuitars = this.updateAndRenderGuitars.bind(this)
    this.deleteGuitarsAndRenderResponse = this.deleteGuitarsAndRenderResponse.bind(this)
  }

  async renderHomeWithGuitars (req, res) {
    const guitars = await this.guitarsDao.getAll()
    res.render('home', {
      guitars
    })
  }

  async renderSingleGuitars (req, res) {
    const id = req.params.id

    try {
      const guitars = await this.guitarsDao.getById(id)

      if (!guitars) {
        res.status(404).render('404')
        return
      }

      res.render('guitars', {
        id,
        label: guitars.label,
        model: guitars.model,
        color: guitars.color
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderGuitarsCreationForm (req, res) {
    res.render('guitars-form')
  }

  async renderGuitarsUpdateForm (req, res) {
    const id = req.params.id

    try {
      const guitars = await this.guitarsDao.getById(id)

      if (!guitars) {
        res.status(404).render('404')
        return
      }

      res.render('guitars-form', {
        id,
        label: guitars.label,
        model: guitars.model,
        color: guitars.color
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderGuitars (req, res) {
    const label = req.body.label
    const model = req.body.model
    const color = req.body.color

    const guitars = { label, model, color }

    try {
      const id = await this.guitarsDao.create(guitars)

      res.redirect(`/guitars/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderGuitars (req, res) {
    const id = req.params.id
    const label = req.body.label
    const model = req.body.model
    const color = req.body.color

    try {
      const guitars = { label, model, color, id }

      await this.guitarsDao.update(guitars)

      res.redirect(`/guitars/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deleteGuitarsAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const guitars = await this.guitarsDao.getById(id)

      if (!guitars) {
        res.status(404).render('404')
        return
      }

      await this.guitarsDao.delete(id)

      res.render('guitars-deleted', {
        id,
        label: guitars.label
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = GuitarsController

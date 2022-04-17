class GuitarsDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, label, model, color FROM guitars')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, label, model, color FROM guitars WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (guitars) {
    const response = await this.db.query('INSERT INTO guitars (label, model, color) VALUES (?, ?, ?)', [guitars.label, guitars.model, guitars.color])
    const result = response[0]
    return result.insertId
  }

  async update (guitars) {
    const response = await this.db.query('UPDATE guitars SET label = ?, model = ?, color = ? WHERE id = ?', [guitars.label, guitars.model, guitars.color, guitars.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM guitars WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = GuitarsDAO

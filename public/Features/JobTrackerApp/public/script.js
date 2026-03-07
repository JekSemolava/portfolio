class JobApp {
  constructor() {
    this.jobListEl = document.getElementById('jobList');
    this.addBtn = document.getElementById('addBtn');
    this.companyInput = document.getElementById('company');
    this.positionInput = document.getElementById('position');
    this.statusInput = document.getElementById('status');
    this.tagsInput = document.getElementById('tags');

    this.addBtn.addEventListener('click', this.addJob.bind(this));

    this.loadJobs();
  }

  async loadJobs() {
    const res = await fetch('/api/jobs');
    const jobs = await res.json();
    console.log('Loaded jobs:', jobs);
    this.renderJobs(jobs);
  }

  async addJob() {
  const company = this.companyInput.value.trim();
  const position = this.positionInput.value.trim();
  const status = this.statusInput.value;
  const tags = this.tagsInput.value
    .split(',')
    .map(t => t.trim())
    .filter(t => t);

  if (!company || !position) return alert('Please fill out company and position!');

  const res = await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ company, position, status, tags })
  });

  const data = await res.json();
    console.log('Added job:', data); // 🧭 add this
    this.loadJobs();

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Server error:', errorText);
    return alert('❌ Error adding job. Check console.');
  }

  this.loadJobs();

  this.companyInput.value = '';
  this.positionInput.value = '';
  this.statusInput.value = 'Applied';
  this.tagsInput.value = '';
}


  async deleteJob(id) {
    await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
    this.loadJobs();
  }

  async updateStatus(id, newStatus) {
    await fetch(`/api/jobs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    this.loadJobs();
  }

  renderJobs(jobs) {
    this.jobListEl.innerHTML = '';

    jobs.forEach(job => {
      const li = document.createElement('li');
      li.className = 'jobItem';
      li.innerHTML = `
        <div class="jobHeader">
          <strong>${job.company}</strong>
          <button class="delete">X</button>
        </div>
        <div class="jobBody">
          <div><em>${job.position}</em></div>
          <div class="status">
            <label>Status:</label>
            <select class="statusSelect">
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div class="tags">
            ${(job.tags || []).map(tag => `<span class="tag">${tag}</span>`).join(' ')}
          </div>
        </div>
      `;

      // Delete job
      const delBtn = li.querySelector('.delete');
      delBtn.addEventListener('click', () => this.deleteJob(job.id));

      // Status change dropdown
      const statusSelect = li.querySelector('.statusSelect');
      statusSelect.value = job.status || 'Applied';
      statusSelect.setAttribute('value', statusSelect.value);
      statusSelect.addEventListener('change', e => {
        const newStatus = e.target.value;
        this.updateStatus(job.id, newStatus);
        e.target.setAttribute('value', newStatus); // ✅ reapply color
      });


      this.jobListEl.appendChild(li);
    });
  }
}

// Initialize app
new JobApp();

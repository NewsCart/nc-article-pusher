var config = {
    apiKey: "",
    databaseURL: ""
  };

const fb = firebase.initializeApp(config);

Vue.component('article-loader', {
  template: `
    <div>
      <div class="form-wrapper">
        <h2>NewsCart Article Pusher</h2>
        <form>
          <section>
            <label for="title">Title</label>
            <input type="text" v-model="title" name="title" id="title" required spellcheck="true">
          </section>

          <section>
            <label for="author">Author</label>
            <input type="text" v-model="author" name="title" id="author" required spellcheck="true">
          </section>

          <section>
            <label for="source">Source</label>
            <input type="text" v-model="source" name="source" id="source" required spellcheck="true">
          </section>

          <section>
            <label for="link">Link</label>
            <input type="text" v-model="link" name="link" id="link" required>
          </section>

          <section>
            <label for="image">Image Link</label>
            <input type="text" v-model="imageLink" name="image" id="image">
          </section>

          <section>
            <label for="description">Description</label>
            <textarea name="description" v-model="description" id="description" maxlength="70">
            </textarea>
            <p id="chars-left">{{charsLeft}} characters left</p>
          </section>

          <section>
            <label for="topic">Topic:</label>
            <p class="select-info">Hold down Command(mac)/Ctrl (windows) to select/deselect multiples</p>
            <select class="multiselect-box" v-model="topic" multiple>
              <option>Artificial Intelligence</option>
              <option>AR/VR</option>
              <option>Big Data</option>
              <option>Bots</option>
              <option>Brands</option>
              <option>Commerce</option>
              <option>Consumer Tech</option>
              <option>Digital Advertising</option>
              <option>Internet of Things</option>
              <option>Mergers and Acquisitions</option>
              <option>Mobile</option>
              <option>Music</option>
              <option>Native Advertising</option>
              <option>OTT</option>
              <option>Programmatic Advertising</option>
              <option>Publishers</option>
              <option>Regulation</option>
              <option>Social Media</option>
              <option>Streaming Music</option>
              <option>TV Advertising</option>
              <option>TV/Film</option>
              <option>Video</option>
            </select>
          </section>
          <section id="user-select">
            <label for="company">Company:</label>
            <p class="select-info">Leave unselected for global articles</p>
            <select class="multiselect-box" v-model="company" id="company" multiple>
              <option>NBC</option>
              <option>Time Inc</option>
              <!--<option>World Nomads</option>
              <option>Because Of Them We Can</option>
              <option>Turner Center</option> -->
            </select>
          </section>

          <button id="submit-article" @click="addArticle">Submit</button>
        </form>
      </div>

      <div class="preview-wrapper">
        <div class="preview">
      		<h2>Preview</h2>
      		<div>
      		 <img id="preview-img" :src="imageLink" alt="" class="preview-img">
      		</div>
      		<div class="preview-content">
      			<h3 id="preview-title">{{title}}</h3>
            <p id="preview-author">{{ author}}</p>
            <p id="preview-source">{{ source }}</p>
      			<p id="preview-description">{{description}}</p>
      			<p><a href="#" id="preview-link">{{link}}</a></p>
            <p>Topics: {{topic}}</p>
            <p>{{company}}</p>
      		</div>
        </div>

  	  </div>
    </div>
`,
  computed: {
    date: function () {
      return moment().format('MMMM DD YYYY h:mm A');
    },
    charsLeft(state) {
      return 70 - state.description.length;
    },
    objectID: function(){
      return encodeURIComponent(this.title.split(' ').join('').toLowerCase());
    }
  },
  data(){
    return {

      articlesRef: fb.database().ref('articles'),
      title: '',
      author: '',
      source: '',
      link: '',
      imageLink: '',
      description: '',
      topic: [],
      company: []

    }
  },
  methods: {
    addArticle() {
      let objectIDHolder = this.objectID;
      this.articlesRef.child(objectIDHolder).set( {
        publishedAt: this.date,
        author: this.author,
        source: this.source,
        title: this.title,
        url: this.link,
        urlToImage: this.imageLink,
        description: this.description,
        topic: this.topic,
        company: this.company,
        objectID: this.objectID
      });
    }
  }
});


new Vue({
  el: '#app'
});

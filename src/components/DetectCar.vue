<template>
  <div>
    <div class="content row">
      <div class="col-md-5">
        <input id="uploadfile" accept="image/*" type="file" v-show="false">
        <div id="dragable" class="card card-body view file-upload">
          <i
            v-if="isPreviewing"
            v-show="isHovering"
            @click="deleteImagePreview()"
            class="fas fa-times"
          ></i>
          <div class="preview" v-if="isPreviewing">
            <img class="img-preview" :src="imagePreviewSrc">
          </div>
          <div v-else class="card-text file-upload-message">
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Drag and drop an image here or click</p>
          </div>
        </div>
      </div>
      <div class="col-md-2 text-center">
        <div class="spinner-border text-success" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <button
          :disabled="imagePreviewSrc === '' "
          @click="detect()"
          class="btn btn-success btn-lg"
        >
          Detect
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
      <div class="col-md-5">
        <div class="card card-body view file-upload">
          <div class="preview" v-if="isDetected">
            <img class="img-preview" :src="detectedImage">
          </div>
          <div v-else class="card-text file-upload-message">
            <i class="fas fa-images"></i>
            <p>Your Detect Result</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { CAR_URL } from "../env";
export default {
  data() {
    return {
      predictions: [],
      dragableInstance: {},
      isPreviewing: false,
      imagePreviewSrc: "",
      isHovering: false,
      file: {},
      isDetected: false,
      detectedImage: "",
      isDetecting: false
    };
  },
  mounted() {
    this.dragableInstance = $("#dragable");
    this.setDragListener();
    this.setUploadFileListener();
    this.setBrowseFile();
  },
  methods: {
    setDragListener() {
      $("#dragable").on("mouseleave", this.handleLeaveColor);
      window.addEventListener("dragenter", this.handleEnterColor);
      window.addEventListener("dragleave", this.handleLeaveColor);
      window.addEventListener("dragover", this.handleEnterColor);
      window.addEventListener("drop", this.uploadFileByDrag, true);
    },
    disableUploadListener() {
      $("#dragable").off("click");
      $("#dragable").off("mouseenter");
      $("#dragable").off("mouseleave");
      $("#dragable").on("mouseenter", e => {
        this.isHovering = true;
      });
      $("#dragable").on("mouseleave", e => {
        this.isHovering = false;
      });
    },
    deleteImagePreview() {
      this.isPreviewing = false;
      this.isHovering = false;
      this.imagePreviewSrc = "";
    },
    setUploadFileListener() {
      $("#uploadfile").change(e => {
        e.preventDefault();
        var img = document.createElement("img");
        var reader = new FileReader();
        reader.onload = () => {
          img.src = reader.result;
          img.onload = () => {
            this.imagePreviewSrc = this.resizeImage(img, 500, 500);
            this.isPreviewing = true;
            this.dragableInstance.css("background-color", "#fff");
          };
        };
        this.file = e.target.files[0];
        reader.readAsDataURL(this.file);
      });
    },
    detect() {
      let formdata = new FormData();
      formdata.append("file", this.file);
      this.isDetected = false;
      this.isDetecting = true;
      axios
        .post(CAR_URL + "/prediction", formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(result => {
          this.detectedImage =
            "data:image/png;base64, " + result.data.prediction;
          this.isDetecting = false;
          this.isDetected = true;
        });
    },
    setBrowseFile() {
      $("#dragable").click(e => {
        e.preventDefault();
        if (!this.isPreviewing) {
          $("#uploadfile").click();
        }
      });
    },
    resizeImage(img, newwidth, newheight) {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var MAX_WIDTH = newwidth;
      var MAX_HEIGHT = newheight;
      var width = img.width;
      var height = img.height;
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      return canvas.toDataURL("image/png");
    },
    handleEnterColor(e) {
      e.preventDefault();
      this.dragableInstance.css("background-color", "rgba(62, 69, 81, 0.1)");
    },
    handleLeaveColor(e) {
      e.preventDefault();
      this.dragableInstance.css("background-color", "#fff");
    },
    uploadFileByDrag(e) {
      e.preventDefault();
      var img = document.createElement("img");
      var reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result;
        img.onload = () => {
          this.imagePreviewSrc = this.resizeImage(img, 500, 500);
          this.isPreviewing = true;
          this.dragableInstance.css("background-color", "#fff");
        };
      };
      this.file = e.dataTransfer.files[0];
      reader.readAsDataURL(this.file);
    }
  },
  watch: {
    isPreviewing() {
      if (this.isPreviewing) {
        this.disableUploadListener();
      } else {
        this.setDragListener();
        this.setBrowseFile();
      }
    }
  }
};
</script>

<style lang="css" scoped>
.content {
  min-height: 600px;
}
.file-upload {
  font-size: 1rem;
  text-align: center;
  color: #ccc;
  display: flex;
  height: 100%;
  min-width: 500px;
  justify-content: center;
}
.file-upload i {
  font-size: 3rem;
}
.card {
  border: 0;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;
}
.preview {
  max-height: 600px;
  max-width: 500px;
  margin: auto;
}
.img-preview {
  max-height: 600px;
  max-width: 500px;
}
.card-body {
  padding: 0;
}
.btn {
  margin-top: 250px;
}
</style>

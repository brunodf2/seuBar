import Bar from "../models/Bar";
import imagesView from "./images_view";

export default {
  render(bar: Bar) {
    return {
      id: bar.id,
      name: bar.name,
      latitude: bar.latitude,
      longitude: bar.longitude,
      sobre: bar.sobre,
      horario_de_funcionamento: bar.horario_de_funcionamento,
      aberto: bar.aberto,
      images: imagesView.renderMany(bar.images),
    };
  },

  renderMany(bares: Bar[]) {
    return bares.map((bar) => this.render(bar));
  },
};

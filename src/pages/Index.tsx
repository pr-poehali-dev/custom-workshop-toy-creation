import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [toyDescription, setToyDescription] = useState("");
  const [generatedToy, setGeneratedToy] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!toyDescription.trim()) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedToy(toyDescription);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-purple-100">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🧸</span>
            <h1 className="text-2xl font-bold text-primary">CustomWorkshop</h1>
          </div>
          <div className="flex gap-6">
            <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">
              Главная
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              О нас
            </a>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors font-medium">
              Контакты
            </a>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <div className="mb-8">
            <h2 className="text-6xl font-bold text-primary mb-4">
              Создай игрушку мечты! ✨
            </h2>
            <p className="text-2xl text-foreground/80">
              Опиши свою идеальную игрушку, и наша нейросеть воплотит её в жизнь
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-16">
            <Card className="p-8 bg-white shadow-2xl animate-scale-in hover:shadow-primary/20 transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Sparkles" className="text-secondary" size={32} />
                <h3 className="text-2xl font-bold text-foreground">Опиши игрушку</h3>
              </div>
              <Textarea
                value={toyDescription}
                onChange={(e) => setToyDescription(e.target.value)}
                placeholder="Например: мягкий розовый единорог с блестящими крыльями и радужной гривой..."
                className="min-h-[200px] text-lg border-2 border-primary/20 focus:border-primary resize-none"
              />
              <Button
                onClick={handleGenerate}
                disabled={!toyDescription.trim() || isGenerating}
                className="w-full mt-4 text-lg py-6 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg hover:shadow-xl transition-all"
              >
                {isGenerating ? (
                  <>
                    <Icon name="Loader2" className="animate-spin mr-2" size={24} />
                    Создаём волшебство...
                  </>
                ) : (
                  <>
                    <Icon name="Wand2" className="mr-2" size={24} />
                    Создать игрушку!
                  </>
                )}
              </Button>
            </Card>

            <Card className="p-8 bg-white shadow-2xl animate-scale-in hover:shadow-accent/20 transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Image" className="text-accent" size={32} />
                <h3 className="text-2xl font-bold text-foreground">Твоя игрушка</h3>
              </div>
              <div className="min-h-[200px] border-2 border-dashed border-accent/30 rounded-lg flex items-center justify-center bg-gradient-to-br from-accent/5 to-secondary/5">
                {generatedToy ? (
                  <div className="text-center p-6 animate-fade-in">
                    <img
                      src="https://cdn.poehali.dev/projects/bf4c1fbd-56e0-4ae0-a971-e63b3e410881/files/e366a991-4e0b-4083-8f32-e96c27e2d2ca.jpg"
                      alt="Generated toy"
                      className="rounded-lg shadow-xl mb-4 w-full max-w-sm mx-auto"
                    />
                    <p className="text-lg text-foreground/80 font-medium">
                      <Icon name="CheckCircle2" className="inline text-green-500 mr-2" size={24} />
                      Готово! Вот твоя уникальная игрушка
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground p-6">
                    <Icon name="ImagePlus" className="mx-auto mb-4 text-accent/50" size={64} />
                    <p className="text-lg">Здесь появится твоя игрушка</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl animate-fade-in">
          <h2 className="text-5xl font-bold text-center text-accent mb-12">
            <Icon name="Heart" className="inline mr-3" size={48} />
            О нас
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-to-br from-pink-50 to-pink-100 border-2 border-primary/20 hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-primary mb-3">Волшебство AI</h3>
              <p className="text-lg text-foreground/80">
                Используем самые современные нейросети для создания уникальных игрушек по вашим описаниям
              </p>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-secondary/20 hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-secondary mb-3">Детская мечта</h3>
              <p className="text-lg text-foreground/80">
                Каждая игрушка создаётся с любовью и вниманием к деталям, чтобы радовать детей
              </p>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-accent/20 hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-2xl font-bold text-accent mb-3">Уникальность</h3>
              <p className="text-lg text-foreground/80">
                Ваша игрушка будет единственной в своём роде — точно такой, как вы её описали
              </p>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500/20 hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-green-600 mb-3">Быстро</h3>
              <p className="text-lg text-foreground/80">
                От идеи до визуализации — всего несколько секунд благодаря мощности нейросетей
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center animate-fade-in">
          <h2 className="text-5xl font-bold text-secondary mb-8">
            <Icon name="Mail" className="inline mr-3" size={48} />
            Контакты
          </h2>
          <Card className="p-10 bg-white shadow-2xl">
            <div className="space-y-6 text-lg">
              <div className="flex items-center justify-center gap-4 hover:scale-105 transition-transform">
                <Icon name="Phone" className="text-primary" size={28} />
                <a href="tel:+79991234567" className="text-foreground hover:text-primary font-medium">+7 (919) 123-45-67</a>
              </div>
              <div className="flex items-center justify-center gap-4 hover:scale-105 transition-transform">
                <Icon name="Mail" className="text-accent" size={28} />
                <a href="mailto:hello@customworkshop.ru" className="text-foreground hover:text-accent font-medium">
                  hello@customworkshop.ru
                </a>
              </div>
              <div className="flex items-center justify-center gap-4 hover:scale-105 transition-transform">
                <Icon name="MapPin" className="text-secondary" size={28} />
                <span className="text-foreground font-medium">г. Пермь, ул. Игрушечная, д. 1</span>
              </div>
              <div className="pt-6 border-t border-border">
                <p className="text-xl font-bold text-primary mb-4">Следите за нами:</p>
                <div className="flex justify-center gap-6">
                  <a href="#" className="text-foreground hover:text-primary transition-colors hover:scale-125 transform">
                    <Icon name="Instagram" size={36} />
                  </a>
                  <a href="#" className="text-foreground hover:text-primary transition-colors hover:scale-125 transform">
                    <Icon name="Facebook" size={36} />
                  </a>
                  <a href="#" className="text-foreground hover:text-accent transition-colors hover:scale-125 transform">
                    <Icon name="Twitter" size={36} />
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="py-8 bg-primary/10 text-center">
        <p className="text-foreground/80 text-lg">© 2025 CustomWorkshop. Создаём игрушки мечты с любовью 💝</p>
      </footer>
    </div>
  );
};

export default Index;
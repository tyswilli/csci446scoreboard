class HighscoresController < ApplicationController
  # GET /highscores
  # GET /highscores.json
  def index
    @highscores = Highscore.all

    respond_to do |format|
      format.json { render json: @highscores }
    end
  end


  # POST /highscores
  # POST /highscores.json
  def create
    @highscore = Highscore.new();
    @highscore.name = params[:name];
    @highscore.score = params[:score];
    respond_to do |format|
      if @highscore.save
        format.json { render json: @highscore, status: :created, location: @highscore }
      else
        format.json { render json: @highscore.errors, status: :unprocessable_entity }
      end
    end
  end
end

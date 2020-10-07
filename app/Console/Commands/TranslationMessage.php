<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Events\TranslationEvent;

class TranslationMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'translation:messages {id} {message}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fire event';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        event(new TranslationEvent(
            $this->argument('id'),
            $this->argument('message')
        ));
    }
}
